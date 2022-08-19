import React, { useState, useEffect } from "react";

const Users = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("https://assessment.api.vweb.app/users");
        if (!res.ok) {
          throw new Error(`This is an HTTP error: The status is ${res.status}`);
        }
        let item = await res.json();
        setData(item);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  return (
    <div>
      <div className="section-user">
        <p className="user">Users</p>
      </div>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <div className="section-table">
        <table cellSpacing="0">
          <thead>
            <tr style={{ background: "transparent" }}>
              <th>Name</th>
              <th>User ID</th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.map((data) => (
                <tr className="second-row">
                  <td className="user-name">{data.name}</td>
                  <td className="user-id">{data.user_id}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
