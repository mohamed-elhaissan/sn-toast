export const injectStyles = () => {
    if (typeof document === 'undefined') {
        return;
    }
    const styleID = "buzzly-toast-inject-styles";
    if (document.getElementById(styleID)) {
        return;
    }
    const style = document.createElement('style');
    style.id = styleID
    style.textContent = `
    :root {
    /* success Toast */
    --success-background: #d2f3d7;
    --success-border-color: #9be4a6;
    --success-text-color: #2dc744;
    /* warning Toast */
    --warning-background: #fff3e7;
    --warning-border-color: #ffb575;
    --warning-text-color: #ff9f4c;
    /* error Toast */
    --error-background: #fdd6d4;
    --error-border-color: #fba19c;
    --error-text-color: #f53126;
    /* info Toast */
    --info-background: #cce2fd;
    --info-border-color: #8ec0fb;
    --info-text-color: #1079f6;
    /* default Toast */
    --background: white;
    --border-color: #f3f3f3;
    --text-color: #171717;
}

.toast-container {
    position: fixed;
    width: 360px;
    max-width: calc(100vw - 2rem);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 1rem;
    z-index: 9999;
}

.toast {
    letter-spacing: -0.025em;
    width: 100%;
    padding: 1rem;
    gap: 0.5rem;
    display: flex;
    border-width: 1px;
    border-style: solid;
    align-items: center;
    justify-content: start;
    font-size: 0.9rem;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.1);
}

.success-toast {
    background-color: var(--success-background);
    border-color: var(--success-border-color);
    color: var(--success-text-color);
}

.error-toast {
    background-color: var(--error-background);
    border-color: var(--error-border-color);
    color: var(--error-text-color);
}

.warning-toast {
    background-color: var(--warning-background);
    border-color: var(--warning-border-color);
    color: var(--warning-text-color);
}

.default-toast {
    background-color: var(--background);
    border-color: var(--border-color);
    color: var(--text-color);
}

.info-toast {
    background-color: var(--info-background);
    border-color: var(--info-border-color);
    color: var(--info-text-color);
}

.top-left {
  top: 0;
  left: 0;
}

.top-right {
  top: 0;
  right: 0;
}

.bottom-left {
  bottom: 0;
  left: 0;
}

.bottom-right {
  bottom: 0;
  right: 0;
}

.top-center {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.bottom-center {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.toast-close {
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  opacity: 0.5;
  padding: 0;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  transition: opacity 0.15s;
}

.toast-close:hover {
  opacity: 1;
}
`
    document.head.appendChild(style)
}
