import { Fragment }from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';


function preventDefault(event) {
  event.preventDefault();
}

export default function Orders({ vendors, inventory }) {

  let rows = [];
  let obj = {};

  let sale_amount = [];

  console.log(inventory);

  
  inventory.forEach(items => {
    let totalSale = items.quantity * items.price_unit;
    sale_amount = [...sale_amount, totalSale];
  });

  vendors.forEach((items, index) => {
    obj.brand_name = items.brand;
    obj.address = items.address;
    obj.sale_amount = sale_amount[index];
    rows.push(obj);
    obj = {};
  });

  console.log(sale_amount);

  return (
    <Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Brand Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.brand_name}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell align="right">{`MYR${row.sale_amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
}