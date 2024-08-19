'use client';



//import React, { useState } from 'react';
//import ParseTree from './ParseTree'; // Ensure this is correctly imported from where the component is located
import axios from 'axios'; // You'll need to install axios if not already installed: npm install axios

const HomePage = () => {
  // Predefined JSON data
  // const initialData = {
  //   value: "Example sentence",
  //   translation: "Example translation",
  //   children: [
  //     // Your predefined data structure
  //   ],
  // };


  // Korean
  const initialData = {
    "type": "sentence",
    "value": "저는 비 오는 일요일 오후에 둠 메탈을 듣는 것을 좋아해요.",
    "translation": "I like listening to doom metal on rainy Sunday afternoons.",
    "children": [
      {
        "type": "noun_phrase",
        "value": "저는",
        "translation": "I",
        "children": [
          {
            "type": "pronoun",
            "value": "저",
            "translation": "I"
          },
          {
            "type": "particle",
            "value": "는",
            "translation": "topic marker"
          }
        ]
      },
      {
        "type": "noun_phrase",
        "value": "비 오는 일요일 오후에",
        "translation": "on rainy Sunday afternoons",
        "children": [
          {
            "type": "noun_phrase",
            "value": "비 오는 일요일",
            "translation": "rainy Sunday",
            "children": [
              {
                "type": "noun_phrase",
                "value": "비 오는",
                "translation": "rainy",
                "children": [
                  {
                    "type": "noun",
                    "value": "비",
                    "translation": "rain"
                  },
                  {
                    "type": "verb",
                    "value": "오는",
                    "translation": "coming"
                  }
                ]
              },
              {
                "type": "noun",
                "value": "일요일",
                "translation": "Sunday"
              }
            ]
          },
          {
            "type": "noun",
            "value": "오후",
            "translation": "afternoon"
          },
          {
            "type": "particle",
            "value": "에",
            "translation": "time/location particle"
          }
        ]
      },
      {
        "type": "verb_phrase",
        "value": "둠 메탈을 듣는",
        "translation": "listening to doom metal",
        "children": [
          {
            "type": "noun",
            "value": "둠 메탈",
            "translation": "doom metal"
          },
          {
            "type": "particle",
            "value": "을",
            "translation": "object marker"
          },
          {
            "type": "verb",
            "value": "듣는",
            "translation": "listening"
          }
        ]
      },
      {
        "type": "noun_phrase",
        "value": "것을",
        "translation": "the act of",
        "children": [
          {
            "type": "noun",
            "value": "것",
            "translation": "thing, act"
          },
          {
            "type": "particle",
            "value": "을",
            "translation": "object marker"
          }
        ]
      },
      {
        "type": "verb_phrase",
        "value": "좋아해요",
        "translation": "like",
        "children": [
          {
            "type": "verb",
            "value": "좋아하다",
            "translation": "like"
          },
          {
            "type": "politeness_marker",
            "value": "해요",
            "translation": "politeness marker"
          }
        ]
      }
    ]
  }












  // State to hold the parse tree data
  const [data, setData] = useState(initialData);

  // State for form inputs
  const [sentence, setSentence] = useState('');
  const [language, setLanguage] = useState('Japanese'); // Default language
  const [userId, setUserId] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/api/parse-tree', {
        sentence,
        language,
        userId,
      });

      // Update the parse tree with the new data
      setData(response.data);
    } catch (error) {
      console.error('Error fetching new parse tree data:', error);
      // Handle error (e.g., show a notification)
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-8">Japanese Parse Tree Visualization (like mirinae.io)</h1>
      
      {/* Form for submitting custom sentences */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="sentence">Sentence:</label>
          <input
            type="text"
            id="sentence"
            className="w-full p-2 border border-gray-300 rounded"
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="language">Language:</label>
          <input
            type="text"
            id="language"
            className="w-full p-2 border border-gray-300 rounded"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            className="w-full p-2 border border-gray-300 rounded"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      
      <div className="flex justify-center">
        <ParseTree data={data} />
      </div>
    </div>
  );
};

export default HomePage;


























// import React from 'react';
// import ParseTree from '../components/ParseTree';

// const HomePage = () => {

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold text-center mb-8">Japanese Parse Tree Visualization (like mirinae.io)</h1>
//       <div className="flex justify-center">
//         <ParseTree data={data} />
//       </div>
//     </div>
//   );
// };

// export default HomePage;











































// ---------------------- component -------------------------

// import React, { useEffect, useRef, useState } from 'react';
// import * as d3 from 'd3';

// const ParseTree = ({ data }) => {
//   const svgRef = useRef();
//   const [hoveredNodeData, setHoveredNodeData] = useState(null); // State to hold hovered node data

//   useEffect(() => {
//     const margin = { top: 20, right: 120, bottom: 20, left: 200 };
//     const width = 1200 - margin.right - margin.left;  // Adjusted width for more horizontal space
//     const height = 800 - margin.top - margin.bottom;  // Adjusted height for a better aspect ratio

//     // Clear any existing SVG elements before rendering
//     d3.select(svgRef.current).selectAll('*').remove();

//     const svg = d3.select(svgRef.current)
//       .attr('viewBox', `0 0 ${width + margin.right + margin.left} ${height + margin.top + margin.bottom}`)
//       .attr('preserveAspectRatio', 'xMidYMid meet')  // Ensure the SVG scales while maintaining aspect ratio
//       .attr('width', '100%')
//       .attr('height', '100%')
//       .style('font', '12px sans-serif')
//       .append('g')
//       .attr('transform', `translate(${margin.left},${margin.top})`);

//     // Tree layout with decreased horizontal spacing
//     const treeLayout = d3.tree().size([height, width / 1.5]);

//     const root = d3.hierarchy(data);
//     treeLayout(root);

//     // Links (branches)
//     svg.selectAll('.link')
//       .data(root.links())
//       .enter()
//       .append('path')
//       .attr('class', 'link')
//       .attr('d', d3.linkHorizontal().x(d => d.y * 0.8).y(d => d.x + 40))
//       .attr('stroke', d => d.target.depth === 0 ? '#1f77b4' : '#94a3b8')
//       .attr('stroke-width', 2)
//       .attr('fill', 'none')
//       .attr('stroke-opacity', 0.6);

//     // Nodes (circles + text)
//     const node = svg.selectAll('.node')
//       .data(root.descendants())
//       .enter()
//       .append('g')
//       .attr('class', 'node')
//       .attr('transform', d => `translate(${d.y * 0.8},${d.x + 40})`)  // Decreased horizontal spacing
//       .on('mouseover', function (event, d) {
//         d3.select(this).select('circle').transition().duration(200)
//           .attr('r', 10)
//           .attr('fill', '#ff7f0e');
//         d3.select(this).selectAll('text').transition().duration(200)
//           .style('font-weight', 'bold')
//           .style('fill', '#ff7f0e');  // Change text color on hover

//         // Extract only direct data (no children)
//         const { children, ...nodeData } = d.data;
//         setHoveredNodeData(nodeData);  // Update the state with hovered node data
//       })
//       .on('mouseout', function () {
//         d3.select(this).select('circle').transition().duration(200)
//           .attr('r', 6)
//           .attr('fill', d => d.depth === 0 ? '#1f77b4' : '#4daf4a');
//         d3.select(this).selectAll('text').transition().duration(200)
//           .style('font-weight', 'normal')
//           .style('fill', '#333');  // Revert text color on mouseout
//         setHoveredNodeData(null);  // Clear the state when the mouse leaves the node
//       });

//     node.append('circle')
//       .attr('r', 6)
//       .attr('fill', d => d.depth === 0 ? '#1f77b4' : '#4daf4a')
//       .attr('stroke', '#555')
//       .attr('stroke-width', 2);

//     // Skip displaying the value for the root node
//     node.append('text')
//       .attr('dy', d => d.children ? '-1.5em' : '.35em')  // Position text above parent nodes
//       .attr('x', d => (d.children ? -10 : 10))  // Position text to the left of parent nodes and to the right of leaf nodes
//       .attr('text-anchor', d => d.children ? 'end' : 'start')  // Adjust text alignment
//       .attr('class', d => d.children ? 'text-right text-gray-700' : 'text-left text-gray-700')
//       .text(d => d.depth === 0 ? '' : `${d.data.value}`)  // Exclude value for the root node
//       .attr('font-size', '12px')
//       .attr('font-family', 'sans-serif')
//       .style('fill', '#333');  // Ensure consistent text color

//     // Adding the translation below the original text
//     node.append('text')
//       .attr('dy', d => d.children ? '-.5em' : '1.5em')  // Position translation below the original text
//       .attr('x', d => (d.children ? -10 : 10))  // Align translation text similarly
//       .attr('text-anchor', d => d.children ? 'end' : 'start')  // Adjust text alignment
//       .attr('class', d => d.children ? 'text-right text-gray-500 italic' : 'text-left text-gray-500 italic')
//       .text(d => d.depth === 0 ? '' : d.data.translation ? `(${d.data.translation})` : '')  // Exclude translation for the root node
//       .attr('font-size', '10px')
//       .attr('font-family', 'sans-serif')
//       .style('fill', '#555');  // Lighter color for translations

//     // Adding Zoom and Pan functionality
//     const zoom = d3.zoom()
//       .scaleExtent([0.5, 2])
//       .on('zoom', (event) => {
//         svg.attr('transform', event.transform);
//       });

//     d3.select(svgRef.current).call(zoom);

//   }, [data]);

//   return (
//     <div className="flex flex-col items-center w-full h-screen bg-slate-100">

//       <div className="p-4 bg-gray-100 border-b mb-4 w-full max-w-4xl">
//         <h2 className="font-bold text-xl mb-2">Original Sentence:</h2>
//         <p className="mb-1">{data.value}</p>
//         <h2 className="font-bold text-xl mb-2">Translation:</h2>
//         <p>{data.translation}</p>
//       </div>     

//       <div className="p-4 bg-gray-100 border-b mb-4 w-full max-w-4xl h-48 overflow-y-auto">
//         {hoveredNodeData ? (
//           <div>
//             <h3 className="font-bold text-lg mb-2">Node Data:</h3>
//             {Object.entries(hoveredNodeData).map(([key, value]) => (
//               <div key={key} className="mb-1">
//                 <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-gray-500 italic h-full flex">Hover over a node to see details</div>
//         )}
//       </div>
      

//       <div className="flex-grow w-full max-w-5xl">
//         <svg ref={svgRef} className="w-full h-full"></svg>
//       </div>
//     </div>
//   );
// };

//export default ParseTree;

// --- //



import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface TreeNode {
  value: string;
  translation?: string;
  children?: TreeNode[];
}

interface ParseTreeProps {
  data: TreeNode;
}

const ParseTree: React.FC<ParseTreeProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hoveredNodeData, setHoveredNodeData] = useState<Partial<TreeNode> | null>(null);

  useEffect(() => {
    const margin = { top: 20, right: 120, bottom: 20, left: 200 };
    const width = 1200 - margin.right - margin.left;
    const height = 800 - margin.top - margin.bottom;

    // Clear any existing SVG elements before rendering
    d3.select(svgRef.current).selectAll('*').remove();


    const svg = d3.select(svgRef.current)
    .attr('viewBox', `0 0 ${width + margin.right + margin.left} ${height + margin.top + margin.bottom}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .attr('width', '100%')
    .attr('height', '100%')
    .style('background-color', '#f1f5f9')  // Set the background color directly
    .style('font', '12px sans-serif')
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
  



    // Tree layout with decreased horizontal spacing
    const treeLayout = d3.tree<TreeNode>().size([height, width / 1.5]);

    const root = d3.hierarchy<TreeNode>(data);
    treeLayout(root);

    // Links (branches)
    svg.selectAll('.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', d3.linkHorizontal<d3.HierarchyLink<TreeNode>, d3.HierarchyPointNode<TreeNode>>()
        .x(d => d.y * 0.8)
        .y(d => d.x + 40)
      )
      .attr('stroke', d => d.target.depth === 0 ? '#1f77b4' : '#94a3b8')
      .attr('stroke-width', 1)
      .attr('fill', 'none')
      .attr('stroke-opacity', 0.6);


// Nodes (circles + text)
const node = svg.selectAll<SVGGElement, d3.HierarchyNode<TreeNode>>('.node')
  .data(root.descendants())
  .enter()
  .append('g')
  .attr('class', 'node')
  .attr('transform', d => `translate(${d.y * 0.8},${d.x + 40})`)
  .on('mouseover', function (event, d) {
    d3.select(this).select('circle').transition().duration(200)
      .attr('r', 10)
      .attr('fill', '#ff7f0e');
    d3.select(this).selectAll('text').transition().duration(200)
      .style('font-weight', 'bold')
      .style('fill', '#ff7f0e');

    const { children, ...nodeData } = d.data;
    setHoveredNodeData(nodeData);
  })
  .on('mouseout', function (event, d) {
    d3.select(this).select('circle').transition().duration(200)
      .attr('r', 6)
      // @ts-ignore: Ignore the potential undefined error on 'depth'
      .attr('fill', d => d.depth! === 0 ? '#1f77b4' : '#4daf4a');
    d3.select(this).selectAll('text').transition().duration(200)
      .style('font-weight', 'normal')
      .style('fill', '#333');
    setHoveredNodeData(null);
  });

node.append('circle')
  .attr('r', 6)
  .attr('fill', d => d.depth === 0 ? '#1f77b4' : '#4daf4a')  // This is where the error was
  .attr('stroke', '#555')
  .attr('stroke-width', 1);


    node.append('text')
      .attr('dy', d => d.children ? '-1.5em' : '.35em')
      .attr('x', d => (d.children ? -10 : 10))
      .attr('text-anchor', d => d.children ? 'end' : 'start')
      .attr('class', d => d.children ? 'text-right text-gray-700' : 'text-left text-gray-700')
      .text(d => d.depth === 0 ? '' : `${d.data.value}`)
      .attr('font-size', '12px')
      .attr('font-family', 'sans-serif')
      .style('fill', '#333');

    node.append('text')
      .attr('dy', d => d.children ? '-.5em' : '1.5em')
      .attr('x', d => (d.children ? -10 : 10))
      .attr('text-anchor', d => d.children ? 'end' : 'start')
      .attr('class', d => d.children ? 'text-right text-gray-500 italic' : 'text-left text-gray-500 italic')
      .text(d => d.depth === 0 ? '' : d.data.translation ? `(${d.data.translation})` : '')
      .attr('font-size', '10px')
      .attr('font-family', 'sans-serif')
      .style('fill', '#555');


    const zoom = d3.zoom<SVGSVGElement, unknown>() // The second type argument can be `unknown` if you're not specifying a custom data type.
    .scaleExtent([0.5, 2])
    .on('zoom', (event) => {
      svg.attr('transform', event.transform);
    });
  







    d3.select(svgRef.current).call(zoom);

  }, [data]);

  return (
    <div className="flex flex-col items-center w-full h-screen bg-white-200">
      <div className="p-4 bg-gray-100 border-b mb-4 w-full max-w-4xl">
        <h2 className="font-bold text-xl mb-2">Original Sentence:</h2>
        <p className="mb-1">{data.value}</p>
        <h2 className="font-bold text-xl mb-2">Translation:</h2>
        <p>{data.translation}</p>
      </div>

      <div className="p-4 bg-gray-100 border-b mb-4 w-full max-w-4xl h-48 overflow-y-auto">
        {hoveredNodeData ? (
          <div>
            <h3 className="font-bold text-lg mb-2">Node Data:</h3>
            {Object.entries(hoveredNodeData).map(([key, value]) => (
              <div key={key} className="mb-1">
                <strong>{key}:</strong> {typeof value === 'object' ? JSON.stringify(value) : value}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 italic h-full flex">Hover over a node to see details</div>
        )}
      </div>

      <div className="flex-grow w-full max-w-5xl">
        <svg ref={svgRef} className="w-full h-full"></svg>
      </div>
    </div>
  );
};

//export default ParseTree;

















// --- //



// REGULAR SPACING - FOR SHORTER SENTENCES 

// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const ParseTree = ({ data }) => {
//   const svgRef = useRef();

//   useEffect(() => {
//     const margin = { top: 20, right: 120, bottom: 20, left: 150 };
//     const width = 800 - margin.right - margin.left;
//     const height = 1200 - margin.top - margin.bottom;  // Further increased height

//     // Clear any existing SVG elements before rendering
//     d3.select(svgRef.current).selectAll('*').remove();

//     const svg = d3.select(svgRef.current)
//       .attr('viewBox', `0 0 ${width + margin.right + margin.left} ${height + margin.top + margin.bottom}`)
//       .style('font', '12px sans-serif')
//       .append('g')
//       .attr('transform', `translate(${margin.left},${margin.top})`);

//     // Significantly increased vertical spacing
//     const treeLayout = d3.tree().size([height, width]);

//     const root = d3.hierarchy(data);
//     treeLayout(root);

//     // Links (branches)
//     svg.selectAll('.link')
//       .data(root.links())
//       .enter()
//       .append('path')
//       .attr('class', 'link')
//       .attr('d', d3.linkHorizontal()
//         .x(d => d.y)
//         .y(d => d.x + 40)  // Further increased vertical spacing between nodes
//       )
//       .attr('stroke', d => d.target.depth === 0 ? '#1f77b4' : '#94a3b8')
//       .attr('stroke-width', 2)
//       .attr('fill', 'none')
//       .attr('stroke-opacity', 0.6);

//     // Nodes (circles + text)
//     const node = svg.selectAll('.node')
//       .data(root.descendants())
//       .enter()
//       .append('g')
//       .attr('class', 'node')
//       .attr('transform', d => `translate(${d.y},${d.x + 40})`)  // Adjusted node positioning for more space
//       .on('mouseover', function (event, d) {
//         d3.select(this).select('circle').transition().duration(200)
//           .attr('r', 10)
//           .attr('fill', '#ff7f0e');
//         d3.select(this).selectAll('text').transition().duration(200)
//           .style('font-weight', 'bold')
//           .style('fill', '#ff7f0e');  // Change text color on hover
//       })
//       .on('mouseout', function (event, d) {
//         d3.select(this).select('circle').transition().duration(200)
//           .attr('r', 6)
//           .attr('fill', d => d.depth === 0 ? '#1f77b4' : '#4daf4a');
//         d3.select(this).selectAll('text').transition().duration(200)
//           .style('font-weight', 'normal')
//           .style('fill', '#333');  // Revert text color on mouseout
//       });

//     node.append('circle')
//       .attr('r', 6)
//       .attr('fill', d => d.depth === 0 ? '#1f77b4' : '#4daf4a')
//       .attr('stroke', '#555')
//       .attr('stroke-width', 2);

//     // Skip displaying the value for the root node
//     node.append('text')
//       .attr('dy', d => d.children ? '-1.5em' : '.35em')  // Position text above parent nodes
//       .attr('x', d => (d.children ? -10 : 10))  // Position text to the left of parent nodes and to the right of leaf nodes
//       .attr('text-anchor', d => d.children ? 'end' : 'start')  // Adjust text alignment
//       .attr('class', d => d.children ? 'text-right text-gray-700' : 'text-left text-gray-700')
//       .text(d => d.depth === 0 ? '' : `${d.data.value}`)  // Exclude value for the root node
//       .attr('font-size', '12px')
//       .attr('font-family', 'sans-serif')
//       .style('fill', '#333');  // Ensure consistent text color

//     // Adding the translation below the original text
//     node.append('text')
//       .attr('dy', d => d.children ? '-.5em' : '1.5em')  // Position translation below the original text
//       .attr('x', d => (d.children ? -10 : 10))  // Align translation text similarly
//       .attr('text-anchor', d => d.children ? 'end' : 'start')  // Adjust text alignment
//       .attr('class', d => d.children ? 'text-right text-gray-500 italic' : 'text-left text-gray-500 italic')
//       .text(d => d.depth === 0 ? '' : d.data.translation ? `(${d.data.translation})` : '')  // Exclude translation for the root node
//       .attr('font-size', '10px')
//       .attr('font-family', 'sans-serif')
//       .style('fill', '#555');  // Lighter color for translations

//     // Adding Zoom and Pan functionality
//     const zoom = d3.zoom()
//       .scaleExtent([0.5, 2])
//       .on('zoom', (event) => {
//         svg.attr('transform', event.transform);
//       });

//     d3.select(svgRef.current).call(zoom);

//   }, [data]);

//   return <svg ref={svgRef} className="w-full h-full"></svg>;
// };

//export default ParseTree;

// --- //

// HORIZONTALLY ADAPTIVE - FOR LONG SENTENCES
// import React, { useEffect, useRef } from 'react';
// import * as d3 from 'd3';

// const ParseTree = ({ data }) => {
//   const svgRef = useRef();

//   useEffect(() => {
//     const margin = { top: 20, right: 120, bottom: 20, left: 200 }; // Adjusted left margin for more space
//     const width = 1200 - margin.right - margin.left;  // Increased width for more horizontal space
//     const height = 1200 - margin.top - margin.bottom;  // Adjusted height

//     // Clear any existing SVG elements before rendering
//     d3.select(svgRef.current).selectAll('*').remove();

//     const svg = d3.select(svgRef.current)
//       .attr('viewBox', `0 0 ${width + margin.right + margin.left} ${height + margin.top + margin.bottom}`)
//       .style('font', '12px sans-serif')
//       .append('g')
//       .attr('transform', `translate(${margin.left},${margin.top})`);

//     // Tree layout with increased horizontal spacing
//     const treeLayout = d3.tree().size([height, width]);

//     const root = d3.hierarchy(data);
//     treeLayout(root);

//     // Links (branches)
//     svg.selectAll('.link')
//       .data(root.links())
//       .enter()
//       .append('path')
//       .attr('class', 'link')
//       .attr('d', d3.linkHorizontal()
//         .x(d => d.y * 1.2) // Increase horizontal spacing by scaling y-values
//         .y(d => d.x + 40))  // Vertical positioning
//       .attr('stroke', d => d.target.depth === 0 ? '#1f77b4' : '#94a3b8')
//       .attr('stroke-width', 2)
//       .attr('fill', 'none')
//       .attr('stroke-opacity', 0.6);

//     // Nodes (circles + text)
//     const node = svg.selectAll('.node')
//       .data(root.descendants())
//       .enter()
//       .append('g')
//       .attr('class', 'node')
//       .attr('transform', d => `translate(${d.y * 1.2},${d.x + 40})`)  // Increased horizontal spacing
//       .on('mouseover', function (event, d) {
//         d3.select(this).select('circle').transition().duration(200)
//           .attr('r', 10)
//           .attr('fill', '#ff7f0e');
//         d3.select(this).selectAll('text').transition().duration(200)
//           .style('font-weight', 'bold')
//           .style('fill', '#ff7f0e');  // Change text color on hover
//       })
//       .on('mouseout', function (event, d) {
//         d3.select(this).select('circle').transition().duration(200)
//           .attr('r', 6)
//           .attr('fill', d => d.depth === 0 ? '#1f77b4' : '#4daf4a');
//         d3.select(this).selectAll('text').transition().duration(200)
//           .style('font-weight', 'normal')
//           .style('fill', '#333');  // Revert text color on mouseout
//       });

//     node.append('circle')
//       .attr('r', 6)
//       .attr('fill', d => d.depth === 0 ? '#1f77b4' : '#4daf4a')
//       .attr('stroke', '#555')
//       .attr('stroke-width', 2);

//     // Skip displaying the value for the root node
//     node.append('text')
//       .attr('dy', d => d.children ? '-1.5em' : '.35em')  // Position text above parent nodes
//       .attr('x', d => (d.children ? -10 : 10))  // Position text to the left of parent nodes and to the right of leaf nodes
//       .attr('text-anchor', d => d.children ? 'end' : 'start')  // Adjust text alignment
//       .attr('class', d => d.children ? 'text-right text-gray-700' : 'text-left text-gray-700')
//       .text(d => d.depth === 0 ? '' : `${d.data.value}`)  // Exclude value for the root node
//       .attr('font-size', '12px')
//       .attr('font-family', 'sans-serif')
//       .style('fill', '#333');  // Ensure consistent text color

//     // Adding the translation below the original text
//     node.append('text')
//       .attr('dy', d => d.children ? '-.5em' : '1.5em')  // Position translation below the original text
//       .attr('x', d => (d.children ? -10 : 10))  // Align translation text similarly
//       .attr('text-anchor', d => d.children ? 'end' : 'start')  // Adjust text alignment
//       .attr('class', d => d.children ? 'text-right text-gray-500 italic' : 'text-left text-gray-500 italic')
//       .text(d => d.depth === 0 ? '' : d.data.translation ? `(${d.data.translation})` : '')  // Exclude translation for the root node
//       .attr('font-size', '10px')
//       .attr('font-family', 'sans-serif')
//       .style('fill', '#555');  // Lighter color for translations

//     // Adding Zoom and Pan functionality
//     const zoom = d3.zoom()
//       .scaleExtent([0.5, 2])
//       .on('zoom', (event) => {
//         svg.attr('transform', event.transform);
//       });

//     d3.select(svgRef.current).call(zoom);

//   }, [data]);

//   return <svg ref={svgRef} className="w-full h-full"></svg>;
// };

//export default ParseTree;


// --- //



//   const data = {
//     "type": "root",
//     "value": "昨日、私は学校で友達と一緒に宿題をしました",
//     "children": [
//       {
//         "type": "adverbial",
//         "value": "昨日"
//       },
//       {
//         "type": "subject",
//         "value": "私は",
//         "children": [
//           {
//             "type": "pronoun",
//             "value": "私"
//           },
//           {
//             "type": "particle",
//             "value": "は"
//           }
//         ]
//       },
//       {
//         "type": "locative",
//         "value": "学校で",
//         "children": [
//           {
//             "type": "noun",
//             "value": "学校"
//           },
//           {
//             "type": "particle",
//             "value": "で"
//           }
//         ]
//       },
//       {
//         "type": "conjunction_phrase",
//         "value": "友達と一緒に",
//         "children": [
//           {
//             "type": "noun",
//             "value": "友達"
//           },
//           {
//             "type": "particle",
//             "value": "と"
//           },
//           {
//             "type": "adverb",
//             "value": "一緒に"
//           }
//         ]
//       },
//       {
//         "type": "object",
//         "value": "宿題を",
//         "children": [
//           {
//             "type": "noun",
//             "value": "宿題"
//           },
//           {
//             "type": "particle",
//             "value": "を"
//           }
//         ]
//       },
//       {
//         "type": "predicate",
//         "value": "しました",
//         "children": [
//           {
//             "type": "verb_stem",
//             "value": "し"
//           },
//           {
//             "type": "suffix",
//             "value": "ました"
//           }
//         ]
//       }
//     ]
//   }
  

// const data = {
//     "type": "root",
//     "value": "先週、彼は東京のカフェで新しい本を読んで、友達と会う予定です。",
//     "children": [
//       {
//         "type": "adverbial",
//         "value": "先週"
//       },
//       {
//         "type": "subject",
//         "value": "彼は",
//         "children": [
//           {
//             "type": "pronoun",
//             "value": "彼"
//           },
//           {
//             "type": "particle",
//             "value": "は"
//           }
//         ]
//       },
//       {
//         "type": "locative",
//         "value": "東京のカフェで",
//         "children": [
//           {
//             "type": "noun",
//             "value": "東京"
//           },
//           {
//             "type": "particle",
//             "value": "の"
//           },
//           {
//             "type": "noun",
//             "value": "カフェ"
//           },
//           {
//             "type": "particle",
//             "value": "で"
//           }
//         ]
//       },
//       {
//         "type": "object",
//         "value": "新しい本を",
//         "children": [
//           {
//             "type": "adjective",
//             "value": "新しい"
//           },
//           {
//             "type": "noun",
//             "value": "本"
//           },
//           {
//             "type": "particle",
//             "value": "を"
//           }
//         ]
//       },
//       {
//         "type": "predicate",
//         "value": "読んで",
//         "children": [
//           {
//             "type": "verb_stem",
//             "value": "読ん"
//           },
//           {
//             "type": "suffix",
//             "value": "で"
//           }
//         ]
//       },
//       {
//         "type": "conjunction_phrase",
//         "value": "友達と会う予定です",
//         "children": [
//           {
//             "type": "noun",
//             "value": "友達"
//           },
//           {
//             "type": "particle",
//             "value": "と"
//           },
//           {
//             "type": "verb_stem",
//             "value": "会う"
//           },
//           {
//             "type": "noun",
//             "value": "予定"
//           },
//           {
//             "type": "suffix",
//             "value": "です"
//           }
//         ]
//       }
//     ]
//   }
  





// const data =   {
//     "type": "root",
//     "value": "저는 지난 주말에 친구들과 함께 서울의 유명한 박물관을 방문하고, 그곳에서 다양한 역사적 유물과 예술 작품들을 감상한 후, 근처에 있는 맛있는 음식점에서 저녁을 먹으며 서로의 근황을 이야기했습니다.",
//     "children": [
//       {
//         "type": "subject",
//         "value": "저는",
//         "children": [
//           {
//             "type": "pronoun",
//             "value": "저",
//             "translation": "I"
//           },
//           {
//             "type": "particle",
//             "value": "는",
//             "translation": "Topic marker"
//           }
//         ]
//       },
//       {
//         "type": "adverbial",
//         "value": "지난 주말에",
//         "translation": "Last weekend",
//         "children": [
//           {
//             "type": "noun",
//             "value": "지난 주말",
//             "translation": "Last weekend"
//           },
//           {
//             "type": "particle",
//             "value": "에",
//             "translation": "At"
//           }
//         ]
//       },
//       {
//         "type": "conjunction_phrase",
//         "value": "친구들과 함께 서울의 유명한 박물관을 방문하고",
//         "translation": "Visited a famous museum in Seoul with my friends",
//         "children": [
//           {
//             "type": "noun",
//             "value": "친구들",
//             "translation": "Friends"
//           },
//           {
//             "type": "particle",
//             "value": "과",
//             "translation": "With"
//           },
//           {
//             "type": "particle",
//             "value": "함께",
//             "translation": "Together"
//           },
//           {
//             "type": "noun_phrase",
//             "value": "서울의 유명한 박물관",
//             "translation": "Famous museum in Seoul",
//             "children": [
//               {
//                 "type": "noun",
//                 "value": "서울",
//                 "translation": "Seoul"
//               },
//               {
//                 "type": "particle",
//                 "value": "의",
//                 "translation": "Of"
//               },
//               {
//                 "type": "adjective",
//                 "value": "유명한",
//                 "translation": "Famous"
//               },
//               {
//                 "type": "noun",
//                 "value": "박물관",
//                 "translation": "Museum"
//               }
//             ]
//           },
//           {
//             "type": "particle",
//             "value": "을",
//             "translation": "Object marker"
//           },
//           {
//             "type": "verb",
//             "value": "방문하고",
//             "translation": "Visited",
//             "children": [
//               {
//                 "type": "verb_stem",
//                 "value": "방문",
//                 "translation": "Visit"
//               },
//               {
//                 "type": "suffix",
//                 "value": "하고",
//                 "translation": "And"
//               }
//             ]
//           }
//         ]
//       },
//       {
//         "type": "conjunction_phrase",
//         "value": "그곳에서 다양한 역사적 유물과 예술 작품들을 감상한 후",
//         "translation": "After admiring various historical artifacts and artworks at that place",
//         "children": [
//           {
//             "type": "noun",
//             "value": "그곳",
//             "translation": "That place"
//           },
//           {
//             "type": "particle",
//             "value": "에서",
//             "translation": "At"
//           },
//           {
//             "type": "noun_phrase",
//             "value": "다양한 역사적 유물과 예술 작품들",
//             "translation": "Various historical artifacts and artworks",
//             "children": [
//               {
//                 "type": "adjective",
//                 "value": "다양한",
//                 "translation": "Various"
//               },
//               {
//                 "type": "adjective",
//                 "value": "역사적",
//                 "translation": "Historical"
//               },
//               {
//                 "type": "noun",
//                 "value": "유물",
//                 "translation": "Artifacts"
//               },
//               {
//                 "type": "particle",
//                 "value": "과",
//                 "translation": "And"
//               },
//               {
//                 "type": "noun",
//                 "value": "예술 작품들",
//                 "translation": "Artworks"
//               }
//             ]
//           },
//           {
//             "type": "verb",
//             "value": "감상한",
//             "translation": "Admiring",
//             "children": [
//               {
//                 "type": "verb_stem",
//                 "value": "감상",
//                 "translation": "Admire"
//               },
//               {
//                 "type": "suffix",
//                 "value": "한",
//                 "translation": "Past participle"
//               }
//             ]
//           },
//           {
//             "type": "suffix",
//             "value": "후",
//             "translation": "After"
//           }
//         ]
//       },
//       {
//         "type": "conjunction_phrase",
//         "value": "근처에 있는 맛있는 음식점에서 저녁을 먹으며 서로의 근황을 이야기했습니다",
//         "translation": "Had dinner at a nearby delicious restaurant while catching up with each other",
//         "children": [
//           {
//             "type": "noun",
//             "value": "근처에 있는 맛있는 음식점",
//             "translation": "Nearby delicious restaurant",
//             "children": [
//               {
//                 "type": "noun",
//                 "value": "근처",
//                 "translation": "Nearby"
//               },
//               {
//                 "type": "particle",
//                 "value": "에",
//                 "translation": "At"
//               },
//               {
//                 "type": "adjective",
//                 "value": "맛있는",
//                 "translation": "Delicious"
//               },
//               {
//                 "type": "noun",
//                 "value": "음식점",
//                 "translation": "Restaurant"
//               }
//             ]
//           },
//           {
//             "type": "particle",
//             "value": "에서",
//             "translation": "At"
//           },
//           {
//             "type": "noun",
//             "value": "저녁",
//             "translation": "Dinner"
//           },
//           {
//             "type": "verb",
//             "value": "먹으며",
//             "translation": "While eating",
//             "children": [
//               {
//                 "type": "verb_stem",
//                 "value": "먹",
//                 "translation": "Eat"
//               },
//               {
//                 "type": "suffix",
//                 "value": "으며",
//                 "translation": "While"
//               }
//             ]
//           },
//           {
//             "type": "noun_phrase",
//             "value": "서로의 근황",
//             "translation": "Each other's recent updates",
//             "children": [
//               {
//                 "type": "pronoun",
//                 "value": "서로의",
//                 "translation": "Each other's"
//               },
//               {
//                 "type": "noun",
//                 "value": "근황",
//                 "translation": "Recent updates"
//               }
//             ]
//           },
//           {
//             "type": "verb",
//             "value": "이야기했습니다",
//             "translation": "Talked",
//             "children": [
//               {
//                 "type": "verb_stem",
//                 "value": "이야기",
//                 "translation": "Talk"
//               },
//               {
//                 "type": "suffix",
//                 "value": "했습니다",
//                 "translation": "Did"
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   }
  


// const data =  {
//     "type": "Sentence",
//     "value": "I like to listen to doom metal on rainy Sunday afternoons.",
//     "translation": "私は雨の日曜日の午後にドゥームメタルを聴くのが好きです。",
//     "children": [
//       {
//         "type": "NounPhrase",
//         "value": "I",
//         "translation": "私",
//         "children": [
//           {
//             "type": "Pronoun",
//             "value": "I",
//             "translation": "私"
//           }
//         ]
//       },
//       {
//         "type": "VerbPhrase",
//         "value": "like to listen to doom metal on rainy Sunday afternoons",
//         "translation": "聴くのが好きです",
//         "children": [
//           {
//             "type": "Verb",
//             "value": "like",
//             "translation": "好きです"
//           },
//           {
//             "type": "InfinitivePhrase",
//             "value": "to listen to doom metal on rainy Sunday afternoons",
//             "translation": "聴く",
//             "children": [
//               {
//                 "type": "Verb",
//                 "value": "listen",
//                 "translation": "聴く"
//               },
//               {
//                 "type": "PrepositionalPhrase",
//                 "value": "to doom metal",
//                 "translation": "ドゥームメタルを",
//                 "children": [
//                   {
//                     "type": "Preposition",
//                     "value": "to",
//                     "translation": "〜を"
//                   },
//                   {
//                     "type": "NounPhrase",
//                     "value": "doom metal",
//                     "translation": "ドゥームメタル",
//                     "children": [
//                       {
//                         "type": "Noun",
//                         "value": "doom metal",
//                         "translation": "ドゥームメタル"
//                       }
//                     ]
//                   }
//                 ]
//               },
//               {
//                 "type": "PrepositionalPhrase",
//                 "value": "on rainy Sunday afternoons",
//                 "translation": "雨の日曜日の午後に",
//                 "children": [
//                   {
//                     "type": "Preposition",
//                     "value": "on",
//                     "translation": "〜に"
//                   },
//                   {
//                     "type": "NounPhrase",
//                     "value": "rainy Sunday afternoons",
//                     "translation": "雨の日曜日の午後",
//                     "children": [
//                       {
//                         "type": "Adjective",
//                         "value": "rainy",
//                         "translation": "雨の"
//                       },
//                       {
//                         "type": "Noun",
//                         "value": "Sunday",
//                         "translation": "日曜日"
//                       },
//                       {
//                         "type": "Noun",
//                         "value": "afternoons",
//                         "translation": "午後"
//                       }
//                     ]
//                   }
//                 ]
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   }
  



// Japanese
// const data = {
//     "type": "sentence",
//     "value": "私は雨の日曜日の午後にドゥームメタルを聴くのが好きです。",
//     "translation": "I like listening to doom metal on rainy Sunday afternoons.",
//     "children": [
//       {
//         "type": "noun_phrase",
//         "value": "私は",
//         "translation": "I",
//         "children": [
//           {
//             "type": "pronoun",
//             "value": "私",
//             "translation": "I"
//           },
//           {
//             "type": "particle",
//             "value": "は",
//             "translation": "topic marker"
//           }
//         ]
//       },
//       {
//         "type": "noun_phrase",
//         "value": "雨の日曜日の午後に",
//         "translation": "on rainy Sunday afternoons",
//         "children": [
//           {
//             "type": "noun_phrase",
//             "value": "雨の日曜日",
//             "translation": "rainy Sunday",
//             "children": [
//               {
//                 "type": "noun",
//                 "value": "雨",
//                 "translation": "rain"
//               },
//               {
//                 "type": "particle",
//                 "value": "の",
//                 "translation": "possessive particle"
//               },
//               {
//                 "type": "noun",
//                 "value": "日曜日",
//                 "translation": "Sunday"
//               }
//             ]
//           },
//           {
//             "type": "particle",
//             "value": "の",
//             "translation": "possessive particle"
//           },
//           {
//             "type": "noun",
//             "value": "午後",
//             "translation": "afternoon"
//           },
//           {
//             "type": "particle",
//             "value": "に",
//             "translation": "time/location particle"
//           }
//         ]
//       },
//       {
//         "type": "verb_phrase",
//         "value": "ドゥームメタルを聴く",
//         "translation": "listening to doom metal",
//         "children": [
//           {
//             "type": "noun",
//             "value": "ドゥームメタル",
//             "translation": "doom metal"
//           },
//           {
//             "type": "particle",
//             "value": "を",
//             "translation": "object marker"
//           },
//           {
//             "type": "verb",
//             "value": "聴く",
//             "translation": "listen"
//           }
//         ]
//       },
//       {
//         "type": "nominalizer_phrase",
//         "value": "のが",
//         "translation": "the act of",
//         "children": [
//           {
//             "type": "nominalizer",
//             "value": "の",
//             "translation": "nominalizer"
//           },
//           {
//             "type": "particle",
//             "value": "が",
//             "translation": "subject marker"
//           }
//         ]
//       },
//       {
//         "type": "adjective_phrase",
//         "value": "好きです",
//         "translation": "like",
//         "children": [
//           {
//             "type": "adjective",
//             "value": "好き",
//             "translation": "like"
//           },
//           {
//             "type": "copula",
//             "value": "です",
//             "translation": "politeness marker"
//           }
//         ]
//       }
//     ]
//   }
  












