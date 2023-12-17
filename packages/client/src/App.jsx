import { Route } from 'wouter';
import { Toaster } from 'sonner';

import { Admin, Game } from '@/pages';
import { Background } from './components';

function App() {
  return (
    <Background>
      <Toaster richColors />

      <Route path="/" component={Game} />
      <Route path="/admin" component={Admin} />
    </Background>
  );
}

export default App;
