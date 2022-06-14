import { Container, Grid, Paper, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import Chart from "../../../components/Chart";
import Deposits from "../../../components/Deposits";
import Orders from "../../../components/Orders";

export default function DisplayReport() {

  const [vendors, setVendor] = useState([]);
  const [inventory, setInventory] = useState([]);


  const loadInventory = async () => {
    try {
      const controller = new AbortController();
      const signal = controller.signal;

      let request = await fetch("http://localhost:8080/ims-fyp/api/items/get", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
      });

      if (request.status === 200) {
        let response = await request.json();

        setInventory(response);
      }

      return () => {
          controller.abort();
      } 

    } catch (error) {
      console.log(error);
    }
  }


  const loadVendor = async () => {
    try {
      const controller = new AbortController();
      const signal = controller.signal;

      let request = await fetch("http://localhost:8080/ims-fyp/api/vendors/get", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
      });

      if (request.status === 200) {
        let response = await request.json();

        setVendor(response);
      }

      return () => {
          controller.abort();
      } 

    } catch (error) {
      console.log(error);
    }
  }

  
  useEffect(() => {
    (async () => {
      let mounted = true;
      if (mounted) {
        await loadVendor();
        await loadInventory();        
      }

      return () => mounted = false;
    })();
  }, []);

  return (
      <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders vendors={vendors} inventory={inventory}/>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
  );
}