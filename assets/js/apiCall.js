const jobsApiData =[];
const sheetId = '1uLN1TTQTLaSZk33GaetqC_AQMpsIHht_gyuE34LtXPc';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = 'jobApi';
const query = encodeURIComponent('Select *')
const url = `${base}&sheet=${sheetName}&tq=${query}`
async function apiCall() {
    await fetch(url)
        .then(res => res.text())
        .then(rep => {
            //Remove additional text and extract only JSON:
            const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
      
            const col = [];
            //Extract column labels
            jsonData.table.cols.forEach((heading) => {
                if (heading.label) {
                    let column = heading.label;
                    col.push(column);
                }
            });
            //extract row data:
            jsonData.table.rows.forEach((rowData) => {
                const row = {};
                col.forEach((ele, ind) => {
                    row[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
                });
                jobsApiData.push(row);
            });
        });
    return  jobsApiData;
}
