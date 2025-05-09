function runFloydWarshall() {
    const n = parseInt(document.getElementById("vertices").value);
    const edgeInput = document.getElementById("edges").value.trim().split('\n');
    const INF = Infinity;

    const dist = Array.from({ length: n }, () => Array(n).fill(INF));

    // Set diagonal to 0
    for (let i = 0; i < n; i++) dist[i][i] = 0;

    // Parse edge input
    edgeInput.forEach(line => {
      const [u, v, w] = line.split(' ').map(Number);
      dist[u][v] = w;
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
    const outputDiv = document.getElementById("output");
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