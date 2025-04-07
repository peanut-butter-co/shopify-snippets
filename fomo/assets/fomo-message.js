if (!customElements.get('fomo-message')) {
  class FomoMessage extends HTMLElement {
    constructor() {
      super();
      this.productId = this.dataset.productId;
      this.sectionId = this.dataset.sectionId;
      this.messageSpan = this.querySelector(`#fomo-${this.sectionId}`);
    }

    connectedCallback() {
      // Start updating every 5 seconds
      this.startUpdating();
    }

    disconnectedCallback() {
      // Clean up when element is removed
      if (this.updateInterval) {
        clearInterval(this.updateInterval);
      }
    }

    startUpdating() {
      // Initial update
      this.updateSection();
      
      // Set interval for updates
      this.updateInterval = setInterval(() => {
        this.updateSection();
      }, 5000); // 5 seconds
    }

    updateSection() {
      const url = `${window.location.pathname}?section_id=${this.sectionId}`;
      
      fetch(url)
        .then(response => response.text())
        .then(responseText => {
          const html = new DOMParser().parseFromString(responseText, 'text/html');
          const newFomoMessage = html.querySelector(`fomo-message[data-product-id="${this.productId}"]`);
          
          if (newFomoMessage) {
            const newMessageSpan = newFomoMessage.querySelector(`#fomo-${this.sectionId}`);
            if (newMessageSpan && this.messageSpan.textContent !== newMessageSpan.textContent) {
              // Only update if content has changed
              this.messageSpan.textContent = newMessageSpan.textContent;
              
              // Add a subtle animation
              this.messageSpan.animate([
                { opacity: 0.5, transform: 'translateY(5px)' },
                { opacity: 1, transform: 'translateY(0)' }
              ], {
                duration: 300,
                easing: 'ease-out'
              });
            }
          } else {
            // If the message is no longer present (e.g., fell below minimum), remove the component
            this.remove();
          }
        })
        .catch(e => {
          console.error('Error updating FOMO message:', e);
        });
    }
  }

  customElements.define('fomo-message', FomoMessage);
} 