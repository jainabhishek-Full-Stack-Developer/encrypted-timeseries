import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import "./index.css"

const socket = io('http://localhost:5000/'); // Replace with your server's URL

function Data() {
  const [successRate, setSuccessRate] = useState(0);
  const [decryptedMessages, setDecryptedMessages] = useState([]);


  useEffect(() => {
    // Listen for 'successRate' events from the server
    socket.on('successRate', (data) => {
      setSuccessRate(data);
    });

    // Listen for 'decryptedMessages' events from the server
    socket.on('decryptedMessages', (data) => {
      setDecryptedMessages(data);
    });

    // Clean up event listeners when the component unmounts
    return () => {
      socket.off('successRate');
      socket.off('decryptedMessages');
    };
  }, []);

  return (
    <>
      <div className="container-fluid p-5">
        <h2 className="mb-3">Real Time Data</h2 >
        <div className="table-responsive">
          <table className="table p-5">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Origin</th>
                <th scope="col">Destination</th>
                <th scope="col">Timestamp</th>
                <th scope="col">Success Rate</th>
              </tr>
            </thead>
            <tbody>
              {decryptedMessages.map((message, index) => (
                <tr key={index}>
                 
                  <td>{message.name}</td>
                  <td> {message.origin}</td>
                  <td>{message.destination}</td>
                  <td>{message.timestamp}</td>
                  <td>{successRate.toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div >


    </>

  );
}

export default Data;
