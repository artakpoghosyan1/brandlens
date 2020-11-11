export const cssTransitionClasses = `
    // drop-left
    
    .drop-left-enter {
      opacity: 0;
      max-width: 0;
      width: 0;
      padding: 0;
    }
    .drop-left-enter-active {
      opacity: 1;
      max-width: 300px;
      width: auto;
      padding: 0 53px 0 20px;
      transition: opacity .3s, max-width .2s, padding .3s;
    }
    .drop-left-exit {
      opacity: 1;
      padding: 0 53px 0 20px;
      max-width: 300px;
      width: auto;
    }
    .drop-left-exit-active {
      opacity: 0;
      max-width: 0;
      width: 0;
      padding: 0;
      transition: opacity .15s, max-width .3s, padding .3s;
    }
    
    // effects
    
    .effects-enter {
      bottom: -118px;
    }
    .effects-enter-active {
      bottom: 0;
      transition: bottom .3s;
    }
    .effects-exit {
      bottom: 0;
    }
    .effects-exit-active {
      bottom: -118px;
      transition: bottom .3s;
    }
    
    // record-wrapper
    
    .record-wrapper-enter {
      opacity: 0;
    }
    .record-wrapper-active {
      opacity: 1;
      transition: opacity .3s;
    }
    .record-wrapper-exit {
      opacity: 1;
    }
    .record-wrapper-exit-active {
      opacity: 0;
      transition: opacity .3s;
    }
`
