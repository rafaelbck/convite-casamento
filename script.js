    /* 
       CONFIGURAÇÕES EDITÁVEIS DO CONVITE
        */
    const WEDDING_CONFIG = {
      // Data oficial corrigida: 03 de Abril de 2027 às 16:00 (Horário de Brasília -03:00)
      dateISO: '2027-04-03T16:00:00-03:00',
      calendarEvent: {
        title: 'Casamento Thamiris & Rafael',
        description: 'Cerimônia às 16h na Catedral Nossa Senhora de Belém, seguida de recepção no Centro de Eventos Bass Ranch.',
        location: 'Catedral Nossa Senhora de Belém - Guarapuava, PR',
        startUTC: '20270403T190000Z', // 16h BRT = 19h UTC
        endUTC: '20270404T030000Z'
      }
    };

    /* 
       1. TRANSIÇÃO DE ABERTURA DO ENVELOPE (COM TRAVA DE DUPLO CLIQUE)
        */
    (function initEnvelope() {
      const trigger = document.getElementById('envelopeTrigger');
      const stage = document.getElementById('envelopeStage');
      const content = document.getElementById('invitationContent');
      let isOpened = false;

      function openInvitation() {
        if (isOpened) return;
        isOpened = true;

        // 1. Inicia abertura da aba e subida do cartão
        trigger.classList.add('is-opening');

        // 2. Após a aba abrir, dissolve o palco do envelope e libera o convite
        setTimeout(() => {
          stage.classList.add('is-hidden');
          document.body.classList.remove('is-locked');
          content.classList.add('is-visible');
        }, 950);
      }

      trigger.addEventListener('click', openInvitation);
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openInvitation();
        }
      });
    })();

    /* 
       2. CONTAGEM REGRESSIVA
        */
    (function initCountdown() {
      const targetTime = new Date(WEDDING_CONFIG.dateISO).getTime();
      const elDays = document.getElementById('cd-days');
      const elHours = document.getElementById('cd-hours');
      const elMins = document.getElementById('cd-mins');
      const elSecs = document.getElementById('cd-secs');

      function update() {
        const now = Date.now();
        const diff = Math.max(0, targetTime - now);

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / 1000 / 60) % 60);
        const secs = Math.floor((diff / 1000) % 60);

        elDays.textContent = String(days).padStart(2, '0');
        elHours.textContent = String(hours).padStart(2, '0');
        elMins.textContent = String(mins).padStart(2, '0');
        elSecs.textContent = String(secs).padStart(2, '0');
      }

      update();
      setInterval(update, 1000);
    })();

    /* 
       5. COPIAR CHAVE PIX COM FEEDBACK VISUAL
        */
    document.getElementById('btnCopyPix').addEventListener('click', async function () {
      const key = document.getElementById('pixKeyText').textContent.trim();
      const originalText = this.textContent;

      try {
        await navigator.clipboard.writeText(key);
        this.textContent = 'Chave Pix Copiada!';
        this.style.backgroundColor = 'var(--olive-main)';
        this.style.color = '#FFFFFF';
      } catch (err) {
        this.textContent = 'Selecione e copie acima';
      }

      setTimeout(() => {
        this.textContent = originalText;
        this.style.backgroundColor = '';
        this.style.color = '';
      }, 2500);
    });