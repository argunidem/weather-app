import Card from './components/Card';

const App = () => {
  return (
    <main
      style={{
        backgroundImage: `url("https://source.unsplash.com/${window.screen.width}x${window.screen.height}/?landscape")`,
      }}
      className='bg-slate-900 flex items-center justify-center min-h-screen bg-no-repeat bg-center bg-fixed'
    >
      <Card />
    </main>
  );
};

export default App;
