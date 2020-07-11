Solving Graphs

Interviewer Prompt
Write a function that determines if a path exists between two vertices of a directed graph.

The graph will be represented as an object, each of whose keys represents a vertex of the graph and whose value represents all vertices that can be reached from the aforementioned key.

In the example below, there is a connection from vertex a to vertex b and a connection from vertex b to vertices c and d but not a connection from vertex b to vertex a.

{
  a: ['b'],
  b: ['c', 'd'],
  c: ['d']
}

Example Output

Note: interviewee does not have to construct their own graphs.


const graph = {
  a: ['b'],
  b: ['c', 'd'],
  c: ['d'],
  d: []
}

doesPathExist(graph, 'a', 'b') // true
doesPathExist(graph, 'b', 'a') // false
doesPathExist(graph, 'a', 'd') // true
doesPathExist(graph, 'a', 'a') // false

const graph = {
  a: ['a', 'c'],
  c: ['r', 's'],
  r: ['a'],
  s: []
}

doesPathExist(graph, 'a', 'a') // true
doesPathExist(graph, 'c', 'c') // true
doesPathExist(graph, 'r', 's') // true
doesPathExist(graph, 's', 'a') // false
