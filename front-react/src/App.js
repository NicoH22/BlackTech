import React from 'react';
import './App.css';
import Home from './Components/Home/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Detail from './Components/Detail';
import AdminPanel from './Components/Admin/AdminPanel';
import LoginAdmin from './Components/Home/LoginAdmin';
import AddProd from './Components/Admin/AddProd';
import EditProd from './Components/Admin/EditProd';
import ImgDetail from './Components/ImgDetail';
import ProductCategorie from './Components/ProductCategorie';
import SearchResults from './Components/SearchResults';
import Panier from './Components/Commande/Panier';
import LoginUser from './Components/LoginUser';
import ProfilUser from './Components/ProfilUser';
import EditProfil from './Components/EditProfil';
import Commande_confirmation from './Components/Commande/Commande_confirmation';
import Guest_commande from './Components/Commande/Guest_commande';

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/detail/" component={Detail} />
        <Route path="/admin/panel" component={AdminPanel} />
        <Route exact path="/login" component={LoginAdmin} />
        <Route exact path="/admin/add" component={AddProd} />
        <Route exact path="/admin/edit" component={EditProd} />
        <Route path="/img" component={ImgDetail} />
        <Route path="/categories/" component={ProductCategorie} />
        <Route path="/search/:name" component={SearchResults} />
        <Route path="/panier" component={Panier} />
        <Route path="/register" component={LoginUser} />
        <Route path="/mon_profil" component={ProfilUser} />
        <Route path="/editprofil" component={EditProfil} />
        <Route
          path="/commande_confirmation"
          component={Commande_confirmation}
        />
        <Route path="/guest_confirmation" component={Guest_commande} />
      </Router>
    </div>
  );
}

export default App;
