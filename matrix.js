function generateMatrices() {
    createMatrix('The 1st Matrix', 'matrix1', document.getElementById('matrix1Rows').value, document.getElementById('matrix1Cols').value);
    createMatrix('The 2nd Matrix','matrix2', document.getElementById('matrix2Rows').value, document.getElementById('matrix2Cols').value);
}

const createMatrix = (title, containerId, rows, cols) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'number';
            input.value = Math.floor(Math.random() * 100); // Random value between 0 and 99
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult = (title, containerId, rows, cols, dataArray) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let span = document.createElement('span');
            // Calculate the index in the dataArray based on current row and column
            let index = i * cols + j;
            if (index < dataArray.length) {
                span.innerHTML = dataArray[index];
            }
            td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult2D = (title, containerId, dataArray) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');

    for (let i = 0; i < dataArray.length; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < dataArray[0].length; j++) {
            let td = document.createElement('td');
            let span = document.createElement('span');
            span.innerHTML = dataArray[i][j]
            td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
}

function performOperation(operation) {
    let matrix1 = getMatrixData2D('matrix1');
    let matrix2 = getMatrixData2D('matrix2');
    console.log("1st Matrix",matrix1);
    console.log("2nd Matrix", matrix2);
    console.log("Operation", operation);
    let result = []
    if (operation === 'add') {result = addMatrices(matrix1, matrix2);}
    else if (operation === 'subtract') {result = subtractMatrices(matrix1, matrix2);}
    else if (operation === 'multiply') {result = multiplyMatrices(matrix1, matrix2);}
    showResult2D('The Result', 'matrix3', result); // use suitable function for printing results
}

const getMatrixData1D = function (matrixId) {
    let matrixData = [];
    let inputs = document.querySelectorAll(`#${matrixId} input`);
    inputs.forEach(input => {
        matrixData.push(parseInt(input.value, 10));
    });
    return matrixData;
};

const getMatrixData2D = function (matrixId) {
    let matrixData = [];
    let rows = parseInt(document.getElementById(matrixId + 'Rows').value, 10);
    let cols = parseInt(document.getElementById(matrixId + 'Cols').value, 10);
    let inputs = document.querySelectorAll(`#${matrixId} input`);

    for (let i = 0; i < rows; i++) {
        let rowData = [];
        for (let j = 0; j < cols; j++) {
            // Calculate index in the flat list of inputs
            let index = i * cols + j;
            if (index < inputs.length) {
                rowData.push(parseInt(inputs[index].value, 10));
            } else {
                rowData.push(0); // Default value if input is missing
            }
        }
        matrixData.push(rowData);
    }
    return matrixData;
};


// Add your matrix calculation functions here
// The functions must check the posibility of calculation too.
function addMatrices(matrix1, matrix2){ 
    if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
        document.getElementById('matrix3').innerHTML = "Matrices needs to be same size of rows and columns";
        return [];
    }
    let finalmatrix = [];
    for (let i = 0; i < matrix1.length; i++) {
        let matrixrow = [];
        for (let j = 0; j < matrix1[i].length; j++) {
            matrixrow.push(matrix1[i][j] + matrix2[i][j]);
        }
        finalmatrix.push(matrixrow);
    }
    return finalmatrix;
}
const subtractMatrices = function (matrix1, matrix2) { 
	if (matrix1.length !== matrix2.length ||
        matrix1[0].length !== matrix2[0].length) {
        document.getElementById('matrix3').innerHTML = "Matrices needs to be same size of rows and columns";
        return [];
    }
    let finalmatrix = [];
    for (let i = 0; i < matrix1.length; i++) {
        let matrixrow = [];
        for (let j = 0; j < matrix1[i].length; j++) {
            matrixrow.push(matrix1[i][j] - matrix2[i][j]);
        }
        finalmatrix.push(matrixrow);
    }
    return finalmatrix;
};
const multiplyMatrices = (matrix1, matrix2) => { 
	if (matrix1.length !== matrix2[0].length) {
        document.getElementById('matrix3').innerHTML = "Matrix1 needs to have the same rows as Matrix2's columns";
        return [];
    }
    let finalmatrix = [];
    for (let i = 0; i < matrix1.length; i++) {
        finalmatrix[i] = [];
        for (let j = 0; j < matrix2[0].length; j++) {
            let sumrowelement = 0;
            for (let n = 0; n < matrix2.length; n++) {
                sumrowelement += matrix1[i][n] * matrix2[n][j];
            }
            finalmatrix[i][j] = sumrowelement;
        }
    }
    return finalmatrix;
};
