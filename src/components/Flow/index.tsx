import { use, useCallback } from 'react';
import ReactFlow, {
  Node,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  ConnectionLineType,
  Panel,
} from 'reactflow';
import CustomNode from './CustomNode';

import styles from './Flow.module.css';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 },
  },
  {
    id: '2',
    data: { label: 'Node 2' },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: { label: 'Node 3' },
    position: { x: 400, y: 100 },
  },
  {
    id: '4',
    data: { label: 'Node 4' },
    position: { x: 400, y: 200 },
    type: 'custom',
    className: styles.customNode,
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
];

const nodeTypes = {
  custom: CustomNode,
};

const defaultEdgeOptions = {
  animated: true,
  type: 'smoothstep',
};

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  /* Add node and prompt the name dialog */
  const handleAddNode =  useCallback(() => {
    const label = prompt('Enter the name of the node');
    if (!label) {
      return;
    }
    const newNode: Node = {
      id: Date.now().toString(),
      data: { label },
      position: { x: 100, y: 100 },
    };
    setNodes((nodes) => nodes.concat(newNode));
  }, [setNodes]);

  /* JSON EXPORT with Download*/
  const handleExportFlowJSON = useCallback(() => {
    const flow = { nodes, edges };
    const json = JSON.stringify(flow, null, 2);
    console.log(json);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flow.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [nodes, edges]);

  /* Api call for run all the blocks one by one and makes an API call to the Flask server and displays the result from the server */
    const handleRunFlow = useCallback(async () => {
      // Implement the logic to run the flow
      // Exexute them one by one by using the ids of the nodes
      for (const node of nodes) {
        // Make an API call to the Flask server(https://flask-hajqdlxaba-uc.a.run.app/)
        if (!node.data.label) {
          return;
        }
        // POST API Call for each node
        const response = await fetch('https://flask-hajqdlxaba-uc.a.run.app/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ label: node.data.label }),
        });
        if (!response.ok) {
          throw new Error(`API call failed: ${response.status}`);
        }
        try {
          console.error(Error);
        } catch (error: any) {
          console.error(error);
        }
      }
    }, []);
    

  return (
    <div className={styles.flow}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      >
      <Panel position="top-right">
        <button onClick={handleAddNode}>Add Node</button>
        <button onClick={handleExportFlowJSON}>Export Flow JSON</button>
        <button onClick={handleRunFlow}>Run Flow</button>
      </Panel>
      </ReactFlow>
    </div>
  );
}

export default Flow;
