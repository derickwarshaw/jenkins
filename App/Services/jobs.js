export default {
  getJobs: (api) => {
    return api.get('/api/json?tree=jobs[name,color]');
  },
  startJob: (api, job) => {
    return api.post(`/job/${job}/build`);
  }
};

/**
 * # check if job exists
 curl -XGET 'http://jenkins/checkJobName?value=yourJobFolderName' --user user.name:YourAPIToken

 # with folder plugin
 curl -s -XPOST 'http://jenkins/job/FolderName/createItem?name=yourJobName' --data-binary @config.xml -H "Content-Type:text/xml" --user user.name:YourAPIToken

 # without folder plugin
 curl -s -XPOST 'http://jenkins/createItem?name=yourJobName' --data-binary @config.xml -H "Content-Type:text/xml" --user user.name:YourAPIToken

 # create folder
 curl -XPOST 'http://jenkins/createItem?name=FolderName&mode=com.cloudbees.hudson.plugins.folder.Folder&from=&json=%7B%22name%22%3A%22FolderName%22%2C%22mode%22%3A%22com.cloudbees.hudson.plugins.folder.Folder%22%2C%22from%22%3A%22%22%2C%22Submit%22%3A%22OK%22%7D&Submit=OK' --user user.name:YourAPIToken -H "Content-Type:application/x-www-form-urlencoded"


 # see http://jenkins/api/

 */
