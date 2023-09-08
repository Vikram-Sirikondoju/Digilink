import React from 'react';

const DateFormat = ({ dateString, formatType }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);

    let formattedDate;
    switch (formatType) {
      case 'MM-DD-YYYY':
        formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
        break;
      case 'DD-MM-YYYY':
        formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        break;
      case 'YYYY-MM-DD':
        formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        break;
      case 'YYYY-DD-MM':
        formattedDate = `${date.getFullYear()}-${date.getDate()}-${date.getMonth() + 1}`;
        break;
      default:
        formattedDate = date.toLocaleDateString();
        break;
    }

    return formattedDate;
  };

  const formattedDate = formatDate(dateString);

  return <span>{formattedDate}</span>;
};

export default DateFormat;
