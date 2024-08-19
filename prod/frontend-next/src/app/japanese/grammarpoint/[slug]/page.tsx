// buttons must be imported as client components to server side rendered page
import PlayAudioButton from "@/components/PlayAudioButton";
// https://stackoverflow.com/questions/76309154/next-js-typeerror-failed-to-parse-url-from-when-targeting-api-route-relati
// https://stackoverflow.com/questions/44342226/next-js-error-only-absolute-urls-are-supported

//issue is communicating between containers
//https://blog.devgenius.io/api-calls-between-docker-instances-24124f5bf010
//https://stackoverflow.com/questions/44275794/how-can-one-docker-container-call-another-docker-container
//https://stackoverflow.com/questions/76244803/how-can-i-reach-my-localhost-from-nginx-docker-container

export default async function GrammarPoint({
  params,
}: {
  params: { slug: string };
}) {
  const decodedTitle = params.slug ? decodeURIComponent(params.slug) : "";

  console.log('##################################  ENV VARS  #######################################');
  console.log(process.env.REACT_APP_HOST_IP);

  let apiUrl;
  // If REACT_APP_HOST_IP is defined, use it. Otherwise default to localhost:7000 for VM
  if (process.env.REACT_APP_HOST_IP) {
    apiUrl = `http://${process.env.REACT_APP_HOST_IP}/api/v1/grammar-details`;
  } else {
    apiUrl = `http://localhost:8000/api/v1/grammar-details`;
  }


  const payload = { title: decodedTitle };

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  // Log the entire data object by stringifying it
  console.log("Response Data:", JSON.stringify(data, null, 2));

  const grammarDetails = data.grammar;






  return (
    <>
      <div className="container mx-auto p-1">
        <div className="bg-blue-100 border border-blue-300 text-blue-800 px-4 py-3 rounded relative mt-6 mb-6" role="alert">
          <strong className="font-bold">New Feature!</strong>
          <span className="block sm:inline"> We now have a Japanese text parser that works for custom texts and YouTube, acting as a reading assistant and translator. </span>
          <a
            href="/text-parser"
            className="underline font-semibold hover:text-blue-600 transition-colors"
          >
            Check it out here!
          </a>
        </div>
  
        <div className="mb-6 text-xl font-semibold text-gray-700">
          Decoded Slug: {decodedTitle}
        </div>
  
        <div className="bg-gray-100 shadow-lg rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">
            Japanese JLPT Grammar Point
            <br />
            {decodedTitle}
          </h1>
  
          {grammarDetails && (
            <div className="bg-gray-200 border border-gray-300 rounded-lg p-8">
              <h2 className="text-3xl font-semibold mb-10 text-gray-800">
                {grammarDetails.title}
              </h2>
              <div className="space-y-8">
                <div>
                  <p className="text-xl font-semibold text-gray-800">Short explanation:</p>
                  <div className="text-lg text-gray-700 mt-2">
                    {grammarDetails.short_explanation}
                  </div>
                </div>
  
                <div>
                  <p className="text-xl font-semibold text-gray-800">Formation:</p>
                  <div className="text-lg text-gray-700 mt-2">
                    {grammarDetails.formation}
                  </div>
                </div>
  
                <div>
                  <p className="text-xl font-semibold text-gray-800 mb-2">Examples:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {grammarDetails.examples.map((example: any, index: number) => (
                      <div
                        key={index}
                        className="bg-white shadow-md rounded-lg p-6 transform transition-transform hover:scale-105"
                      >
                        <div className="flex items-start space-x-4">
                          <PlayAudioButton audioSrc={example.grammar_audio} />
                          <div className="flex flex-col">
                            <div className="text-xl text-gray-800 mb-2">
                              {example.jp}
                            </div>
                            <div className="text-xs italic text-gray-600 mb-2">
                              {example.romaji}
                            </div>
                            <div className="text-sm text-gray-700">
                              {example.en}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
  
                <div>
                  <p className="text-xl font-semibold text-gray-800">Long explanation:</p>
                  <div className="text-lg text-gray-700 mt-2">
                    {grammarDetails.long_explanation}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
  
}  







// grid cards, looks very decent, info link to text parser, prod ready
//   return (
//     <>
//       <div className="container mx-auto p-6">
//         <div className="bg-blue-100 border border-blue-300 text-blue-800 px-4 py-3 rounded relative mb-6" role="alert">
//           <strong className="font-bold">New Feature!</strong>
//           <span className="block sm:inline"> We now have a Japanese text parser that works for YouTube, acting as a reading assistant and translator. </span>
//           <a
//             href="https://localhost/text-parser"
//             className="underline font-semibold hover:text-blue-600 transition-colors"
//           >
//             Check it out here!
//           </a>
//         </div>
  
//         <div className="mb-6 text-xl font-semibold text-gray-700">
//           Decoded Slug: {decodedTitle}
//         </div>
  
//         <div className="bg-white shadow-lg rounded-lg p-8">
//           <h1 className="text-4xl font-bold mb-8 text-gray-900">
//             Japanese JLPT Grammar Point
//             <br />
//             {decodedTitle}
//           </h1>
  
//           {grammarDetails && (
//             <div className="bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300 rounded-lg p-8">
//               <h2 className="text-3xl font-semibold mb-10 text-gray-800">
//                 {grammarDetails.title}
//               </h2>
//               <div className="space-y-8">
//                 <div>
//                   <p className="text-xl font-semibold text-gray-800">Short explanation:</p>
//                   <div className="text-lg text-gray-700 mt-2">
//                     {grammarDetails.short_explanation}
//                   </div>
//                 </div>
  
//                 <div>
//                   <p className="text-xl font-semibold text-gray-800">Formation:</p>
//                   <div className="text-lg text-gray-700 mt-2">
//                     {grammarDetails.formation}
//                   </div>
//                 </div>
  
//                 <div>
//                   <p className="text-xl font-semibold text-gray-800 mb-2">Examples:</p>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {grammarDetails.examples.map((example: any, index: number) => (
//                       <div
//                         key={index}
//                         className="bg-white shadow-md rounded-lg p-6 transform transition-transform hover:scale-105"
//                       >
//                         <div className="flex items-start space-x-4">
//                           <PlayAudioButton audioSrc={example.grammar_audio} />
//                           <div className="flex flex-col">
//                             <div className="text-lg text-gray-800 mb-2">
//                               {example.jp}
//                             </div>
//                             <div className="text-lg italic text-gray-600 mb-2">
//                               {example.romaji}
//                             </div>
//                             <div className="text-lg text-gray-700">
//                               {example.en}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
  
//                 <div>
//                   <p className="text-xl font-semibold text-gray-800">Long explanation:</p>
//                   <div className="text-lg text-gray-700 mt-2">
//                     {grammarDetails.long_explanation}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
  
// }  











