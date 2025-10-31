// Add your GitHub Personal Access Token here
const GITHUB_TOKEN = 'Classic token';//works best with tokens as with out token there is a limit of 60pr/hr with token the limit increases to 5000 pr/hr 
const ORGANIZATION_NAME = 'name of the organization';  // Change this to the organization/owner name

function fetchGitHubData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const repoNames = getRepoNames();

  // Data containers for summaries
  const repoPullCounts = {};
  const userMergedPullCounts = {};

  // Fetch pull requests for each repository
  repoNames.forEach(repoName => {
    const pullRequests = getPullRequests(repoName);

    // Store count for Repo Summary
    repoPullCounts[repoName] = pullRequests.length;

    // Store merged pull request counts for User Summary
    pullRequests.forEach(pr => {
      if (pr.status === 'Merged') {
        if (userMergedPullCounts[pr.username]) {
          userMergedPullCounts[pr.username] += 1;
        } else {
          userMergedPullCounts[pr.username] = 1;
        }
      }
    });

    createOrUpdateSheet(sheet, repoName, pullRequests);
  });

  // Create summary sheets
  createRepoSummarySheet(sheet, repoPullCounts);
  createUserSummarySheet(sheet, userMergedPullCounts);
}

function getRepoNames() {
  const url = `https://api.github.com/orgs/${ORGANIZATION_NAME}/repos`;
  const options = {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`
    }
  };
  const response = UrlFetchApp.fetch(url, options);
  const repos = JSON.parse(response.getContentText());
  
  return repos.map(repo => repo.name);
}

function getPullRequests(repoName) {
  let pullRequests = [];
  let page = 1;
  let fetchedPRs;

  do {
    const url = `https://api.github.com/repos/${ORGANIZATION_NAME}/${repoName}/pulls?state=all&per_page=100&page=${page}`;
    const options = {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`
      }
    };
    const response = UrlFetchApp.fetch(url, options);
    fetchedPRs = JSON.parse(response.getContentText());
    
    // Map the fetched PRs to the desired format and add them to the pullRequests array
    pullRequests = pullRequests.concat(fetchedPRs.map(pr => ({
      username: pr.user.login,
      createdAt: new Date(pr.created_at),
      status: pr.merged_at ? 'Merged' : 'Closed',
      mergedBy: pr.merged_at ? (pr.merged_by ? pr.merged_by.login : '') : '',
      mergedAt: pr.merged_at ? new Date(pr.merged_at) : ''
    })));

    page++;
  } while (fetchedPRs.length > 0);  // Continue until there are no more PRs in the response

  return pullRequests;
}

function createOrUpdateSheet(spreadsheet, repoName, pullRequests) {
  let sheet = spreadsheet.getSheetByName(repoName);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(repoName);
    const headers = ['Username', 'Date Created', 'Time Created', 'Status', 'Merged By', 'Merge Date', 'Merge Time'];
    sheet.appendRow(headers);
  } else {
    sheet.clearContents();
    const headers = ['Username', 'Date Created', 'Time Created', 'Status', 'Merged By', 'Merge Date', 'Merge Time'];
    sheet.appendRow(headers);
  }
  
  pullRequests.forEach(pr => {
    const row = [
      pr.username,
      pr.createdAt.toLocaleDateString(),
      pr.createdAt.toLocaleTimeString(),
      pr.status,
      pr.mergedBy,
      pr.mergedAt ? pr.mergedAt.toLocaleDateString() : '',
      pr.mergedAt ? pr.mergedAt.toLocaleTimeString() : ''
    ];
    sheet.appendRow(row);
  });
}

function createRepoSummarySheet(spreadsheet, repoPullCounts) {
  let summarySheet = spreadsheet.getSheetByName('Repo Summary');
  if (!summarySheet) {
    summarySheet = spreadsheet.insertSheet('Repo Summary');
  } else {
    summarySheet.clearContents();
  }

  // Add headers
  summarySheet.appendRow(['Repository', 'Total Pull Requests']);

  // Add data
  Object.keys(repoPullCounts).forEach(repoName => {
    summarySheet.appendRow([repoName, repoPullCounts[repoName]]);
  });
}

function createUserSummarySheet(spreadsheet, userMergedPullCounts) {
  let summarySheet = spreadsheet.getSheetByName('User Summary');
  if (!summarySheet) {
    summarySheet = spreadsheet.insertSheet('User Summary');
  } else {
    summarySheet.clearContents();
  }

  // Add headers
  summarySheet.appendRow(['Username', 'Total Merged Pull Requests']);

  // Add data
  Object.keys(userMergedPullCounts).forEach(username => {
    summarySheet.appendRow([username, userMergedPullCounts[username]]);
  });
}