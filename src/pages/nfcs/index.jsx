import { useState, useEffect, useMemo } from 'react';
import { Upload, FileText, Download, Search, Filter, X, ChevronDown, ChevronUp, ShoppingBag, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

const AuditorNFe = () => {
  const [files, setFiles] = useState([]);
  const [allData, setAllData] = useState([]); 
  const [processedData, setProcessedData] = useState([]); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState(null);
  
  // Estado para Lazy Load
  const [visibleCount, setVisibleCount] = useState(50);

  // Estado para Ordenação
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // Estado para controlar qual nota está sendo visualizada no modal
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Controle da UI de filtros
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    situacao: 'TODAS',
    minValor: '', maxValor: '',
    minDesconto: '', maxDesconto: '',
    minPagBruto: '', maxPagBruto: '',
    minPagLiq: '', maxPagLiq: '',
    minTroco: '', maxTroco: '',
    itemMaiorQue: ''
  });

  // Utilitários de parsing
  const parseCurrency = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? 0.0 : Math.round(num * 100) / 100;
  };

  const formatMoney = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Efeito para aplicar filtros
  useEffect(() => {
    let result = [...allData];

    // 1. Filtro de Situação
    if (filters.situacao !== 'TODAS') {
      if (filters.situacao === 'NORMAL') {
        result = result.filter(r => r.situacao_financeira === 'NORMAL');
      } else if (filters.situacao === 'COM_DESCONTO') {
        result = result.filter(r => r.vDesconto > 0.01);
      } else if (filters.situacao === 'COM_GORJETA') {
        result = result.filter(r => r.situacao_financeira.includes('GORJETA'));
      } else if (filters.situacao === 'TAXA_SISTEMA') {
        result = result.filter(r => r.situacao_financeira.includes('TAXA SISTEMA'));
      } else if (filters.situacao === 'DIVERGENTE') {
        result = result.filter(r => r.situacao_financeira !== 'NORMAL');
      }
    }

    // 2. Filtros Numéricos
    const filterRange = (min, max, value) => {
      if (min && value < parseFloat(min)) return false;
      if (max && value > parseFloat(max)) return false;
      return true;
    };

    result = result.filter(r => {
      if (!filterRange(filters.minValor, filters.maxValor, r.vNF)) return false;
      if (!filterRange(filters.minDesconto, filters.maxDesconto, r.vDesconto)) return false;
      if (!filterRange(filters.minPagBruto, filters.maxPagBruto, r.vPag_bruto)) return false;
      if (!filterRange(filters.minPagLiq, filters.maxPagLiq, r.vPag_liquido)) return false;
      if (!filterRange(filters.minTroco, filters.maxTroco, r.vTroco_real)) return false;
      return true;
    });

    // 3. Filtro de Item Específico
    if (filters.itemMaiorQue) {
      const corte = parseFloat(filters.itemMaiorQue);
      result = result.filter(r => r.produtos.some(p => p.preco > corte));
    }

    setProcessedData(result);
    calculateSummary(result);
    // Reinicia a contagem de visualização quando os filtros mudam
    setVisibleCount(50);
  }, [allData, filters]);

  // Lógica de Ordenação
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null; // Reset para ordem original
    }
    setSortConfig({ key: direction ? key : null, direction });
  };

  // Dados ordenados (Memoizado para performance)
  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return processedData;

    return [...processedData].sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];

      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [processedData, sortConfig]);

  // Handler de Scroll para Lazy Load
  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    // Se chegou perto do fundo (buffer de 50px), carrega mais
    if (scrollHeight - scrollTop <= clientHeight + 50) {
      if (visibleCount < sortedData.length) {
        setVisibleCount(prev => Math.min(prev + 50, sortedData.length));
      }
    }
  };

  const parseXML = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");

        const getTag = (parent, tagName) => {
          const els = parent.getElementsByTagName(tagName);
          return els.length > 0 ? els[0].textContent : null;
        };

        const dados = {
          nNF: '',
          dataEmissao: '',
          CNPJ: '',
          vProd_total: 0.0,
          vNF: 0.0,
          vDesconto: 0.0,
          vPag_bruto: 0.0,
          vTroco_real: 0.0,
          vPag_liquido: 0.0,
          obs_troco: '',
          situacao_financeira: '',
          arquivo: file.name,
          produtos: [],
          status: 'OK'
        };

        try {
          const ide = xmlDoc.getElementsByTagName('ide')[0];
          const emit = xmlDoc.getElementsByTagName('emit')[0];
          
          if (ide) {
            dados.nNF = getTag(ide, 'nNF') || '';
            dados.dataEmissao = getTag(ide, 'dhEmi') || '';
          }
          if (emit) dados.CNPJ = getTag(emit, 'CNPJ') || '';

          const icmsTot = xmlDoc.getElementsByTagName('ICMSTot')[0];
          if (icmsTot) {
            dados.vProd_total = parseCurrency(getTag(icmsTot, 'vProd'));
            dados.vNF = parseCurrency(getTag(icmsTot, 'vNF'));
          }

          dados.vDesconto = Math.round(Math.max(0, dados.vProd_total - dados.vNF) * 100) / 100;

          let vPag_soma = 0.0;
          const detsPag = xmlDoc.getElementsByTagName('detPag');
          for (let i = 0; i < detsPag.length; i++) {
            vPag_soma += parseCurrency(getTag(detsPag[i], 'vPag'));
          }

          const pagElement = xmlDoc.getElementsByTagName('pag')[0];
          const vTroco_xml = pagElement ? parseCurrency(getTag(pagElement, 'vTroco')) : 0.0;

          dados.vPag_bruto = vPag_soma;

          const is_taxa_099 = Math.abs(vTroco_xml - 0.99) < 0.01;

          if (is_taxa_099) {
            dados.vTroco_real = 0.0;
            dados.obs_troco = '(Taxa 0.99)';
            dados.vPag_liquido = vPag_soma;
          } else {
            dados.vTroco_real = vTroco_xml;
            dados.vPag_liquido = Math.round((vPag_soma - vTroco_xml) * 100) / 100;
          }

          const situacoes = [];
          if (dados.vDesconto > 0.01) situacoes.push(`DESCONTO (${formatMoney(dados.vDesconto)})`);
          
          const diff_pag_nf = Math.round((dados.vPag_liquido - dados.vNF) * 100) / 100;
          if (diff_pag_nf > 0.01) situacoes.push(`GORJETA/TAXA (${formatMoney(diff_pag_nf)})`);
          
          if (is_taxa_099) situacoes.push("TAXA SISTEMA (0.99)");
          
          dados.situacao_financeira = situacoes.length > 0 ? situacoes.join(" + ") : "NORMAL";

          const dets = xmlDoc.getElementsByTagName('det');
          for (let i = 0; i < dets.length; i++) {
            const prod = dets[i].getElementsByTagName('prod')[0];
            if (prod) {
              dados.produtos.push({
                nome: getTag(prod, 'xProd'),
                preco: parseCurrency(getTag(prod, 'vProd'))
              });
            }
          }

        } catch (error) {
          console.error("Erro ao ler XML", error);
          dados.status = 'ERRO';
        }

        resolve(dados);
      };
      reader.readAsText(file);
    });
  };

  const handleProcess = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setAllData([]);
    setProcessedData([]);

    const results = [];
    for (const file of files) {
      const data = await parseXML(file);
      results.push(data);
    }

    setAllData(results); 
    setIsProcessing(false);
  };

  const calculateSummary = (data) => {
    if (!data) return;
    const total = data.reduce((acc, curr) => ({
      vProd: acc.vProd + curr.vProd_total,
      vNF: acc.vNF + curr.vNF,
      vDesconto: acc.vDesconto + curr.vDesconto,
      vPagBruto: acc.vPagBruto + curr.vPag_bruto,
      vTrocoReal: acc.vTrocoReal + curr.vTroco_real,
      vPagLiq: acc.vPagLiq + curr.vPag_liquido,
      count: acc.count + 1
    }), { vProd: 0, vNF: 0, vDesconto: 0, vPagBruto: 0, vTrocoReal: 0, vPagLiq: 0, count: 0 });
    
    setSummary(total);
  };

  const downloadCSV = () => {
    if (processedData.length === 0) return;

    const headers = [
      'nNF', 'dataEmissao', 'vProd_total', 'vDesconto', 'vNF', 
      'vPag_bruto', 'vTroco_real', 'vPag_liquido', 'obs_troco', 
      'situacao_financeira', 'arquivo'
    ];

    const csvRows = [
      headers.join(';'),
      ...processedData.map(row => [
        row.nNF,
        row.dataEmissao,
        row.vProd_total.toFixed(2).replace('.', ','),
        row.vDesconto.toFixed(2).replace('.', ','),
        row.vNF.toFixed(2).replace('.', ','),
        row.vPag_bruto.toFixed(2).replace('.', ','),
        row.vTroco_real.toFixed(2).replace('.', ','),
        row.vPag_liquido.toFixed(2).replace('.', ','),
        row.obs_troco,
        `"${row.situacao_financeira}"`,
        row.arquivo
      ].join(';')),
      ['TOTAL GERAL', '', 
       summary.vProd.toFixed(2).replace('.', ','),
       summary.vDesconto.toFixed(2).replace('.', ','),
       summary.vNF.toFixed(2).replace('.', ','),
       summary.vPagBruto.toFixed(2).replace('.', ','),
       summary.vTrocoReal.toFixed(2).replace('.', ','),
       summary.vPagLiq.toFixed(2).replace('.', ','),
       '', '', ''
      ].join(';')
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'resultado_auditoria.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
      setAllData([]);
      setProcessedData([]);
      setSummary(null);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      situacao: 'TODAS',
      minValor: '', maxValor: '',
      minDesconto: '', maxDesconto: '',
      minPagBruto: '', maxPagBruto: '',
      minPagLiq: '', maxPagLiq: '',
      minTroco: '', maxTroco: '',
      itemMaiorQue: ''
    });
  };

  // Componente de Cabeçalho Ordenável
  const SortableHeader = ({ label, sortKey, align = 'left' }) => {
    const isSorted = sortConfig.key === sortKey;
    
    return (
      <th 
        className={`p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors select-none text-${align}`}
        onClick={() => requestSort(sortKey)}
      >
        <div className={`flex items-center gap-1 ${align === 'right' ? 'justify-end' : ''}`}>
          {label}
          <div className="w-4 flex justify-center">
            {!isSorted && <ArrowUpDown className="w-3 h-3 text-gray-300" />}
            {isSorted && sortConfig.direction === 'asc' && <ArrowUp className="w-3 h-3 text-blue-600" />}
            {isSorted && sortConfig.direction === 'desc' && <ArrowDown className="w-3 h-3 text-blue-600" />}
          </div>
        </div>
      </th>
    );
  };

  const FilterRangeInput = ({ label, minField, maxField }) => (
    <div className="flex flex-col">
      <label className="text-xs font-semibold text-gray-500 mb-1 uppercase">{label}</label>
      <div className="flex gap-2">
        <input 
          type="number" 
          placeholder="Min" 
          value={filters[minField]}
          onChange={(e) => handleFilterChange(minField, e.target.value)}
          className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2 py-1 border"
        />
        <input 
          type="number" 
          placeholder="Max" 
          value={filters[maxField]}
          onChange={(e) => handleFilterChange(maxField, e.target.value)}
          className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 px-2 py-1 border"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <FileText className="w-8 h-8 text-blue-600" />
              Auditor de XML NFe
            </h1>
            <p className="text-gray-500 text-sm mt-1">Carregue, audite e filtre suas notas fiscais.</p>
          </div>
          <div className="flex gap-3">
             {allData.length > 0 && (
               <button 
                 onClick={() => setShowFilters(!showFilters)}
                 className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${showFilters ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
               >
                 <Filter className="w-4 h-4" />
                 Filtros
                 {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
               </button>
             )}
          </div>
        </header>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Arquivos XML
              </label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors">
                <input 
                  type="file" 
                  multiple 
                  accept=".xml" 
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <Upload className="w-6 h-6 mb-1 text-gray-400" />
                  <span className="text-sm">
                    {files.length > 0 ? `${files.length} arquivos selecionados` : "Clique para selecionar XMLs"}
                  </span>
                </div>
              </div>
            </div>

            <div>
               <button 
                  onClick={handleProcess}
                  disabled={files.length === 0 || isProcessing}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-bold shadow-md transition-all active:scale-95"
               >
                 {isProcessing ? 'Lendo...' : 'Processar Notas'}
                 {!isProcessing && <Search className="w-4 h-4" />}
               </button>
            </div>
          </div>
        </div>

        {/* Área de Filtros Expansível */}
        {showFilters && allData.length > 0 && (
          <div className="bg-white rounded-xl shadow-md border border-blue-100 p-5 mb-6 animate-in slide-in-from-top-2">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                <Filter className="w-4 h-4 text-blue-500" /> 
                Filtros Avançados
              </h3>
              <button onClick={clearFilters} className="text-xs text-red-500 hover:underline flex items-center gap-1">
                <X className="w-3 h-3" /> Limpar filtros
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-500 mb-1 uppercase">Situação da Nota</label>
                <select 
                  value={filters.situacao}
                  onChange={(e) => handleFilterChange('situacao', e.target.value)}
                  className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                >
                  <option value="TODAS">Todas as Situações</option>
                  <option value="NORMAL">Normal (Sem divergência)</option>
                  <option value="DIVERGENTE">Qualquer Divergência</option>
                  <option value="COM_DESCONTO">Com Desconto</option>
                  <option value="COM_GORJETA">Com Gorjeta/Taxa</option>
                  <option value="TAXA_SISTEMA">Taxa Sistema (0.99)</option>
                </select>
              </div>

              <FilterRangeInput label="Valor da Nota (R$)" minField="minValor" maxField="maxValor" />
              <FilterRangeInput label="Desconto (R$)" minField="minDesconto" maxField="maxDesconto" />
              <FilterRangeInput label="Pagamento Bruto (R$)" minField="minPagBruto" maxField="maxPagBruto" />
              <FilterRangeInput label="Pagamento Líquido (R$)" minField="minPagLiq" maxField="maxPagLiq" />
              <FilterRangeInput label="Troco (R$)" minField="minTroco" maxField="maxTroco" />
              
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-500 mb-1 uppercase">Algum Item Maior Que</label>
                <input 
                  type="number" 
                  placeholder="Ex: 50.00" 
                  value={filters.itemMaiorQue}
                  onChange={(e) => handleFilterChange('itemMaiorQue', e.target.value)}
                  className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                />
              </div>
            </div>
          </div>
        )}

        {/* Resultados */}
        {summary && (
          <div className="space-y-6">
            
            {/* Cards de Resumo */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10"><FileText className="w-16 h-16" /></div>
                <p className="text-sm text-gray-500 mb-1">Notas Listadas</p>
                <p className="text-2xl font-bold text-gray-800">{summary.count} <span className="text-xs font-normal text-gray-400">/ {allData.length}</span></p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Total Descontos</p>
                <p className="text-2xl font-bold text-red-500">{formatMoney(summary.vDesconto)}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Total Pag. Bruto</p>
                <p className="text-2xl font-bold text-blue-600">{formatMoney(summary.vPagBruto)}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Total Líquido (Caixa)</p>
                <p className="text-2xl font-bold text-green-600">{formatMoney(summary.vPagLiq)}</p>
              </div>
            </div>

            {/* Tabela de Dados */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <div className="flex flex-col">
                  <h3 className="font-semibold text-gray-700">
                    Relatório {filters.situacao !== 'TODAS' ? '(Filtrado)' : ''}
                  </h3>
                  <span className="text-xs text-gray-500 font-normal">Clique na linha para ver os produtos.</span>
                </div>
                <button 
                  onClick={downloadCSV}
                  className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2 text-sm border border-green-200 bg-green-50 px-3 py-1.5 rounded-md hover:bg-green-100 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Baixar CSV
                </button>
              </div>
              <div 
                className="overflow-auto max-h-[600px]"
                onScroll={handleScroll}
              >
                <table className="w-full text-sm text-left">
                  <thead className="text-gray-600 font-medium border-b sticky top-0 z-10 shadow-sm bg-gray-50">
                    <tr>
                      <th className="p-3 bg-gray-50 min-w-[150px]">Arquivo</th>
                      <th className="p-3 bg-gray-50">Nº Nota</th>
                      <th className="p-3 bg-gray-50">Situação</th>
                      <SortableHeader label="V. Prod." sortKey="vProd_total" align="right" />
                      <SortableHeader label="Desconto" sortKey="vDesconto" align="right" />
                      <SortableHeader label="V. Nota" sortKey="vNF" align="right" />
                      <SortableHeader label="Pag. Bruto" sortKey="vPag_bruto" align="right" />
                      <SortableHeader label="Troco" sortKey="vTroco_real" align="right" />
                      <SortableHeader label="Pag. Líquido" sortKey="vPag_liquido" align="right" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {sortedData.length === 0 ? (
                       <tr>
                         <td colSpan="9" className="p-8 text-center text-gray-400">
                           Nenhuma nota encontrada com os filtros atuais.
                         </td>
                       </tr>
                    ) : (
                      sortedData.slice(0, visibleCount).map((row, idx) => (
                        <tr 
                          key={idx} 
                          onClick={() => setSelectedInvoice(row)}
                          className="hover:bg-blue-50 cursor-pointer transition-colors"
                        >
                          <td className="p-3 text-gray-600 truncate max-w-[150px]" title={row.arquivo}>{row.arquivo}</td>
                          <td className="p-3 font-medium">{row.nNF}</td>
                          <td className="p-3">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              row.situacao_financeira === 'NORMAL' 
                                ? 'bg-gray-100 text-gray-600' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {row.situacao_financeira}
                            </span>
                          </td>
                          <td className="p-3 text-right text-gray-500">{formatMoney(row.vProd_total)}</td>
                          <td className="p-3 text-right text-red-500">{formatMoney(row.vDesconto)}</td>
                          <td className="p-3 text-right font-medium">{formatMoney(row.vNF)}</td>
                          <td className="p-3 text-right text-blue-600">{formatMoney(row.vPag_bruto)}</td>
                          <td className="p-3 text-right text-gray-500">
                            {formatMoney(row.vTroco_real)}
                            {row.obs_troco && <span className="text-xs ml-1 text-gray-400">{row.obs_troco}</span>}
                          </td>
                          <td className="p-3 text-right text-green-600">{formatMoney(row.vPag_liquido)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="p-3 text-center text-gray-500 text-sm bg-gray-50 border-t">
                 Exibindo {Math.min(visibleCount, sortedData.length)} de {sortedData.length} registros.
                 {visibleCount < sortedData.length && <span className="ml-2 text-blue-500">Role para ver mais...</span>}
              </div>
            </div>
          </div>
        )}

        {/* Modal de Detalhes dos Produtos */}
        {selectedInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-200">
              {/* Header do Modal */}
              <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <div>
                   <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                     <ShoppingBag className="w-5 h-5 text-blue-600" />
                     Nota Fiscal: {selectedInvoice.nNF}
                   </h2>
                   <p className="text-xs text-gray-500">{selectedInvoice.arquivo}</p>
                </div>
                <button 
                  onClick={() => setSelectedInvoice(null)}
                  className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Corpo do Modal (Lista de Produtos) */}
              <div className="flex-1 overflow-auto p-0">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600 sticky top-0">
                    <tr>
                      <th className="p-3 text-left">Item</th>
                      <th className="p-3 text-right w-32">Valor (R$)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {selectedInvoice.produtos.map((prod, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="p-3 text-gray-700">{prod.nome}</td>
                        <td className="p-3 text-right font-medium text-gray-800">{formatMoney(prod.preco)}</td>
                      </tr>
                    ))}
                    {selectedInvoice.produtos.length === 0 && (
                      <tr>
                        <td colSpan="2" className="p-6 text-center text-gray-400">
                          Nenhum produto listado no XML.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer do Modal (Totais) */}
              <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-4 text-sm">
                <div className="text-right">
                  <p className="text-gray-500">Valor Produtos</p>
                  <p className="font-bold text-gray-800">{formatMoney(selectedInvoice.vProd_total)}</p>
                </div>
                {selectedInvoice.vDesconto > 0 && (
                  <div className="text-right">
                    <p className="text-gray-500">Desconto</p>
                    <p className="font-bold text-red-500">-{formatMoney(selectedInvoice.vDesconto)}</p>
                  </div>
                )}
                <div className="text-right border-l pl-4 ml-2">
                  <p className="text-gray-500">Valor Nota</p>
                  <p className="font-bold text-blue-600 text-lg">{formatMoney(selectedInvoice.vNF)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AuditorNFe;