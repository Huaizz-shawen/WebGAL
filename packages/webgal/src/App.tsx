import Title from '@/UI/Title/Title';
import Logo from '@/UI/Logo/Logo';
import { useEffect } from 'react';
import { initializeScript } from './Core/initializeScript';
import Menu from '@/UI/Menu/Menu';
import { Stage } from '@/Stage/Stage';
import { BottomControlPanel } from '@/UI/BottomControlPanel/BottomControlPanel';
import { Backlog } from '@/UI/Backlog/Backlog';
import { Provider } from 'react-redux';
import { webgalStore } from './store/store';
import { Extra } from '@/UI/Extra/Extra';
import { BottomControlPanelFilm } from '@/UI/BottomControlPanel/BottomControlPanelFilm';
import GlobalDialog from '@/UI/GlobalDialog/GlobalDialog';
import DevPanel from '@/UI/DevPanel/DevPanel';
import Translation from '@/UI/Translation/Translation';
import { PanicOverlay } from '@/UI/PanicOverlay/PanicOverlay';

function App() {
  useEffect(() => {
    initializeScript();
  }, []);

  // Provider用于对各组件提供状态
  return (
    <div className="App">
      <Provider store={webgalStore}>
        <Translation />
        <Stage />
        <BottomControlPanel />
        <BottomControlPanelFilm />
        <Backlog />
        <Title />
        <Logo />
        <Extra />
        <Menu />
        <GlobalDialog />
        <PanicOverlay />
        <DevPanel />
      </Provider>
    </div>
  );
}

export default App;
