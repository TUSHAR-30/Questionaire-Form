/** @jsxImportSource @welldone-software/why-did-you-render */
import React from 'react';
import { EditFormProvider } from './Context/EditFormContext';

// (() => {
//   if (process.env.NODE_ENV === 'development') {
//     import('@welldone-software/why-did-you-render').then((module) => {
//       const whyDidYouRender = module.default;
//       whyDidYouRender(React, {
//         include: [/EditFormProvider/],
//         trackAllPureComponents: false,
//     });
//     });
//   }
// })();



(() => {
  if (process.env.NODE_ENV === 'development') {
    import('@welldone-software/why-did-you-render').then((module) => {
      const whyDidYouRender = module.default;
      whyDidYouRender(React, {
        trackAllPureComponents: true,
    });
    });
  }
})();