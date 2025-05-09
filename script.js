function runFloydWarshall() {
    const verticesInput = document.getElementById("vertices");
    const edgesInput = document.getElementById("edges");
    const outputDiv = document.getElementById("output");

    if (!verticesInput || !edgesInput || !outputDiv) {
        console.error("Missing required DOM elements");
        return;
    }

    const n = parseInt(verticesInput.value);
    if (isNaN(n) || n <= 0) {
        outputDiv.innerHTML = "Please enter a valid number of vertices (positive integer)";
        return;
    }

    const edgeInput = edgesInput.value.trim().split('\n');
    const INF = Infinity;

    const dist = Array.from({ length: n }, () => Array(n).fill(INF));

    // Set diagonal to 0
    for (let i = 0; i < n; i++) dist[i][i] = 0;

    // Parse edge input with validation
    edgeInput.forEach(line => {
        const [u, v, w] = line.trim().split(' ').map(Number);
        if (!isNaN(u) && !isNaN(v) && !isNaN(w) && 
            u >= 0 && v >= 0 && u < n && v < n) {
            dist[u][v] = w;
        } else {
            console.warn(`Skipping invalid edge: ${line}`);
        }
    });

    // Floyd-Warshall algorithm
    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (dist[i][k] + dist[k][j] < dist[i][j]) {
            dist[i][j] = dist[i][k] + dist[k][j];
          }
        }
      }
    }

    // Render output
    let html = "<h2>Distance Matrix</h2><table><tr><th></th>";
    for (let i = 0; i < n; i++) html += `<th>${i}</th>`;
    html += "</tr>";

    for (let i = 0; i < n; i++) {
      html += `<tr><th>${i}</th>`;
      for (let j = 0; j < n; j++) {
        html += `<td>${dist[i][j] === INF ? '∞' : dist[i][j]}</td>`;
      }
      html += "</tr>";
    }

    html += "</table>";
    outputDiv.innerHTML = html;
}