ExecuteOrDelayUntilScriptLoaded(init, 'sp.js');
var currentUser;

function init() {
    var clientContext = SP.ClientContext.get_current();
    var oWeb = clientContext.get_web();
    currentUser = oWeb.get_currentUser();
    clientContext.load(currentUser);
    clientContext.executeQueryAsync(onQuerySucceeded, onQueryFailed);
}

function onQuerySucceeded() {
    var membershipGroupIdToFind = 3;
    document.getElementById('MembershipGroupId').innerHTML = currentUser.get_email();
    
    if (membershipGroupId === membershipGroupIdToFind) {
        document.getElementById('O365_MainLink_Settings').style.display = 'block';
    } else {
        document.getElementById('O365_MainLink_Settings').style.display = 'none';
    }
}

function onQueryFailed(sender, args) {
    alert('Request failed. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace());
}
