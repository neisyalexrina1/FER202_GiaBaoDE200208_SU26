import Footer from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import PizzaList from "./components/PizzaList";
import { Container } from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <Container className="my-5 pb-5">
      <h1 className="text-center mb-5">Welcome to My Pizza App</h1>
      <PizzaList />
      <Footer />
    </Container>
  );
}

export default App;
