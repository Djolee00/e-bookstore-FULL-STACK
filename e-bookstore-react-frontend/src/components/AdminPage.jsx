import axios from 'axios';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const AdminPage = () => {


    const[orders, setOrders] = useState();

    useEffect( ()=> {
        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/api/orders',
            headers: { 
              Authorization: "Bearer "+ window.sessionStorage.getItem("auth_token"),
            },
        };
        
          if(orders == null){
            axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setOrders(response.data.orders);
            })
            .catch(function (error) {
                console.log(error);
            }, [orders]);
          }
    })

    const columns = [
        { 
          field: 'id', 
          headerName: 'ID', 
          width: 70 ,
        },
        { 
          field: 'order_number', 
          headerName: 'Order number', 
          width: 150 
        },
        { 
          field: 'status', 
          headerName: 'Status', 
          width: 100 
        },
        {
          field: 'price_total',
          headerName: 'Price',
          type: 'number',
          width: 100,
        },
        {
          field: 'payment_method',
          headerName: 'Payment method',
          width: 150,
        },
        {
          field: 'full_name',
          headerName: 'Name',
          width: 200,
          valueGetter: (params) =>
            `${params.row.user_data_name || ''} ${params.row.user_data_surname || ''}`,
        },
        {
          field: 'user_data_email',
          headerName: 'Email',
          width: 200,
        },
        {
          field: 'user_data_adress',
          headerName: 'Adress',
          width: 150,
        },
        {
          field: 'user_data_city',
          headerName: 'City',
          width: 100,
        },
        {
          field: 'user_data_postal_code',
          headerName: 'Zip code',
          width: 80,
        },
        {
          field: 'user_data_phone_number',
          headerName: 'Phone number',
          width: 120,
        },
      ];

  function isRowSelectable(){
    return false;
  }  
    
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={orders}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        isRowSelectable={isRowSelectable}
      />
    </div>
  )
}

export default AdminPage