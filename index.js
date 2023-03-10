const core = require('@actions/core');
const github = require('@actions/github');

const main = async () => {
  try {
    
    const owner = core.getInput('owner', { required: true });
    const repo = core.getInput('repo', { required: true });
    const branchName = core.getInput('branch_name', { required: true });
    const token = core.getInput('token', { required: true });
    const workflowName = core.getInput('workflow_name', {required: true})

    const octokit = new github.getOctokit(token);

    await octokit.request('POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches', {
        owner: owner,
        repo: repo,
        workflow_id: workflowName,
        ref: branchName,
        inputs: {},
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })

  } catch (error) {
    core.setFailed(error.message);
  }
}

// Call the main function to run the action
main();