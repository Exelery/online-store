import './index.ts';
import './scss/style.scss';
import App from './components/app/app';
import MainPage from '../src/view/mainPage';

const app = new App();
app.start();

const mainPage = new MainPage();
mainPage.addProductsSection();
