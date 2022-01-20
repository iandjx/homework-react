import React, { useState } from "react";
import "./App.css";
import TopMenu from "./react/components/TopMenu";
import "./index.css";
import Footer from "./react/components/Footer";
import { BrowserRouter, Route } from "react-router-dom";
import Homepage from "./screens/Homepage/Homepage";
import Forums from "./react/forum/Forums";
import NotesMe from "./react/forum/NotesMe";
import CreateNote from "./react/forum/CreateNote";
import NotesEdit from "./react/forum/NotesEdit";
import Login from "./react/user/Login";
import Register from "./react/user/Register";
import Profile from "./react/user/Profile";
import ProfileEdit from "./react/user/ProfileEdit";
import UserManagement from "./react/user/UserManagement";
import CreateUser from "./react/user/CreateUser";
import Messages from "./react/messages/Messages";

function App() {
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <TopMenu />
      <main>
        <Route path="/" component={Homepage} exact />
        <Route path="/forums" component={Forums} exact />
        <Route path="/notesEdit" component={NotesEdit} exact />
        <Route
          path="/notesMe"
          component={({ history }) => (
            <NotesMe search={search} history={history} />
          )}
        />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/profile" component={Profile} exact />
        <Route path="/profileedit" component={ProfileEdit} exact />
        <Route path="/userManagement" component={UserManagement} exact />
        <Route path="/createUser" component={CreateUser} exact />
        <Route path="/createForum" component={CreateNote} exact />
        <Route path="/messages" component={Messages} exact />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
