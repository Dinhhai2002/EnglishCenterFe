
export const user1 = "123";
// import * as React from 'react';
// import { UNSAFE_NavigationContext } from 'react-router-dom';
// import type { History, Blocker, Transition } from 'history';
// import { createMemoryHistory } from "history";

// let history = createMemoryHistory();

// export function useBlocker(blocker: Blocker, when = true): void {
//   const navigator = React.useContext(UNSAFE_NavigationContext)
//     .navigator as History;
//   // 

//   React.useEffect(() => {
//     if (!when) return;

//     const unblock = history.block((tx: Transition) => {
//       const autoUnblockingTx = {
//         ...tx,
//         retry() {
//           unblock();
//           tx.retry();
//         },
//       };

//       blocker(autoUnblockingTx);
//     });

//     return unblock;
//   }, [navigator, blocker, when]);
// }