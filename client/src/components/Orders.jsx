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

    obj.item_name = items.name;
    obj.quantity = items.quantity;
    obj.sale_amount = totalSale;
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
            <TableCell>Item name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.item_name}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell align="right">{`MYR${row.sale_amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
}