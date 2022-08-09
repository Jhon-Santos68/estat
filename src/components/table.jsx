'use strict';
import './table.css';
// import data from './tableJson.json';

const Table = ({ data }) => {
  const Tags = (html) => {
    let tempDivElement = document.createElement('div');
    tempDivElement.innerHTML = html;
    return tempDivElement.textContent || tempDivElement.innerText || '';
  };

  return (
    <div>
      <table
        border="1"
        style={{
          borderCollapse: 'collapse',
          minWidth: '80vw',
          minHeight: '20vh',
        }}
      >
        {data.fields?.static.map((elem) => (
          <tr>
            {elem?.columns.map((item) => (
              <th
                disabled={item.type === 'static'}
                rowSpan={item?.rowspan || 1}
                colSpan={item.colspan || 1}
              >
                {Tags(item?.data)}
              </th>
            ))}
          </tr>
        ))}
        {data.fields?.dynamic.map((elem, elemIndex) => (
          <tr>
            {elem?.columns.map((item) => (
              <td
                type={item?.input_type}
                readonly={item?.mode}
                rowSpan={item?.rowspan || 1}
                colSpan={item.colspan || 1}
                style={{
                  backgroundColor: `${item?.mode ? '#ffff99' : '#ccffcc'}`,
                  overflow: 'hidden',
                  textOverflow: 'clip',
                  whiteSpace: 'nowrap',
                }}
              >
                {item?.data && Tags(item?.data)}
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Table;
