function floydWarshall(): void {
  const verticesInput = document.getElementById("vertices") as HTMLInputElement | null;
  const edgesInput = document.getElementById("edges") as HTMLTextAreaElement | null;
  const outputDiv = document.getElementById("output") as HTMLDivElement | null;

  if (!verticesInput || !edgesInput || !outputDiv) {
    console.error("Missing required DOM elements.");
    return;
  }

  const n: number = parseInt(verticesInput.value);
  const edgeInput: string[] = edgesInput.value.trim().split('\n');
  const INF: number = Infinity;

  const dist: number[][] = Array.from({ length: n }, () => Array(n).fill(INF));

  // Set diagonal to 0
  for (let i = 0; i < n; i++) {
    dist[i][i] = 0;
  }

  // Parse edge input
  edgeInput.forEach((line: string) => {
    const [u, v, w] = line.trim().split(' ').map(Number);
    if (!isNaN(u) && !isNaN(v) && !isNaN(w) && u >= 0 && v >= 0 && u < n && v < n) {
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
  let html: string = "<h2>Distance Matrix</h2><table><tr><th></th>";
  for (let i = 0; i < n; i++) {
    html += `<th>${i}</th>`;
  }
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
