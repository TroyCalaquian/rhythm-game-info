import supabase from "../helper/supabaseClient";
import {Button} from "@heroui/react"
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const signOut = async () => {
    const {error} = await supabase.auth.signOut();
    if (error) throw error;
    navigate("/")
  }

  return (
    <div>
      <h1>Hello, you are logged in.</h1>
      <Button onPress={() => navigate("/AddSong")}>Add song</Button>
      <Button color="primary" onPress={() => signOut()}>
        Sign out
      </Button>
    </div>
  );
}

export default Dashboard;
