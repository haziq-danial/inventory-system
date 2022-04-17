import * as React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';

function AddItem() {
    return (
        <>
            <div>
                <h1>Test</h1>
            </div>
            <Outlet/>
        </>
    );
}

export default AddItem;