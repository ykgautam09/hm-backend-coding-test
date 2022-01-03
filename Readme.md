# Hodomojo Coding Exercise

The goal of these exercises are to assess your proficiency in software engineering that is related to the daily work
that we do at Hodomojo. Please follow the instructions below to complete the assessment.

## Setup

1. Create a new repository in your own github profile named `hm-backend-coding-test` and commit the contents of this
   folder
2. Ensure `node (>8.6 and <= 10)` and `npm` are installed
3. Run `npm install`
4. Run `npm test`
5. Run `npm start`
6. Hit the server to test health `curl localhost:8010/health` and expect a `200` response

## Tasks

Below will be your set of tasks to accomplish. Please work on each of these tasks in order. Success criteria will be
defined clearly for each task

1. [Documentation](#documentation)
2. [Implement Tooling](#implement-tooling)
3. [Implement Pagination](#implement-pagination)
4. [Refactoring](#refactoring)
5. [Security](#security)

### Documentation

Please deliver documentation of the server that clearly explains the goals of this project and clarifies the API
response that is expected.

#### Success Criteria

1. A pull request against `master` of your fork with a clear description of the change and purpose and merge it
3. **[BONUS]** Create an easy way to deploy and view the documentation in a web format and include instructions to do so

### Implement Tooling

Please implement the following tooling:

1. `eslint` - for linting
2. `nyc` - for code coverage
3. `pre-push` - for git pre push hook running tests
4. `winston` - for logging

#### Success Criteria

1. Create a pull request against `master` of your fork with the new tooling and merge it
    1. `eslint` should have an opinionated format
    2. `nyc` should aim for test coverage of `80%` across lines, statements, and branches
    3. `pre-push` should run the tests before allowing pushing using `git`
    4. `winston` should be used to replace console logs and all errors should be logged as well. Logs should go to disk.
2. Ensure that tooling is connected to `npm test`
3. Create a separate pull request against `master` of your fork with the linter fixes and merge it
4. Create a separate pull request against `master` of your fork to increase code coverage to acceptable thresholds and
   merge it

### Implement Pagination

Please implement pagination to retrieve pages of the resource `rides`.

1. Create a pull request against `master` with your changes to the `GET /rides` endpoint to support pagination
   including:
    1. Code changes
    2. Tests
    3. Documentation
2. Merge the pull request

### Refactoring

Please implement the following refactors of the code:

1. Convert callback style code to use `async/await`
2. Reduce complexity at top level control flow logic and move logic down and test independently

#### Success Criteria

1. A pull request against `master` of your fork for each of the refactors above with:
    1. Code changes
    2. Tests

### Security

Please implement the following security controls for your system:

1. Ensure the system is not vulnerable to [SQL injection](https://www.owasp.org/index.php/SQL_Injection)
2. **[BONUS]** Implement an additional security improvement of your choice

#### Success Criteria

1. A pull request against `master` of your fork with:
    1. Changes to the code
    2. Tests ensuring the vulnerability is addressed

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
