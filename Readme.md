# Travel Information System

##### This API provides travel information for various trips and provides means to save new ride informations.

### Configuration

#### Server SETUP

<ol>
<li>clone the repository</li>
<li>configure node on version v10.24.1</li>
<li>run command `npm start`</li>
</ol>
<li>To test code coverage run command `npm run coverage`.</li>
<li>To apply git pre-push hook copy `src/git hook/pre-push` file to `.git/hooks` directory</li>

### Navigation

<ul>
<li>GET /health : responds `Healthy` when API up and running.</li>
<br>
<li>GET /rides : response with rides data (JSON)</li>
<ul>Query parameter :
   <ol>
      <li>page (Number) : default 1 </li>
      <li>size (Number) : default 10 </li>
   </ol>
</ul>
<br>
<li>POST /rides : response with rides data</li>
<ul>Data format :
   <ol>
      <li>start_lat (Number) : Starting point of ride in latitude must be in range of [-90,90] </li>
      <li>start_long (Number) : Starting point of ride in latitude must be in range of [-180,180]  </li>
      <li>end_lat (Number) : Ending point of ride in latitude must be in range of [-90,90]  </li>
      <li>end_long (Number) : Ending point of ride in latitude must be in range of [-180,180]  </li>
      <li>rider_name (String) : Name of the Rider should be a non empty string</li>
      <li>driver_name (String) : Name of the Driver should be a non empty string</li>
      <li>driver_vehicle (String) : Name of the Vehicle should be a non empty string</li>
   </ol>
</ul>
<br>
<li>GET /rides/:id : responds with ride data (JSON) for the provided id (Number) </li>

</ul>
