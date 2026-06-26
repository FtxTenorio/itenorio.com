export const TheOneRing = () => {
  return (
    <>
      <div className="ring-container">
        {/* Substitua o src pelo caminho real da sua imagem no S3 ou /public */}
        <img 
          src="/the-one-ring-2-logo.png" 
          alt="Inscrição do Um Anel" 
          className="the-ring-image"
        />
      </div>

      <style jsx>{`
        .ring-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80vw; /* Fica bem grande no fundo */
          max-width: 800px;
          z-index: 1; /* Fica BEM lá atrás, atrás de todo o texto */
          pointer-events: none;
          opacity: 0.15; /* Sutil para não atrapalhar a leitura */
        }

        .the-ring-image {
          width: 100%;
          height: auto;
          /* O SEGREDO ESTÁ AQUI: Inverte o preto para branco, colore de laranja/amarelo e faz brilhar */
          filter: invert(1) sepia(1) saturate(10000%) hue-rotate(15deg) drop-shadow(0 0 10px rgba(255, 100, 0, 0.8));
          animation: spin-ring 120s linear infinite; /* Rotação super lenta */
        }

        @keyframes spin-ring {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};