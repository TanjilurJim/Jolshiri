import React from 'react';

const BDDateFormat = ({date}: Date | null | undefined) => {
    const day = date.getDate().toString.padStart(2, '0');
    const month = date.getMonth().toString.padStart(2, '0');
    const year = date.getFullYear().toString;
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
};

export default BDDateFormat;