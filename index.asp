<!DOCTYPE html>
<head>
	<meta http-equiv="expires" content="-1" />
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<meta name="copyright" content="2014, Web Site Management" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" >
	<title>Edit File Name</title>
	<link rel="stylesheet" href="css/bootstrap.min.css" />
	<style type='text/css'>
		body
		{
			padding: 10px;
		}
	</style>
	<script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/handlebars-v2.0.0.js"></script>
	<script type="text/javascript" src="rqlconnector/Rqlconnector.js"></script>
	<script type="text/javascript" src="js/edit-file-name.js"></script>
	
	<script id="template-page-headline" type="text/x-handlebars-template" data-container="#page-headline .controls" data-action="replace">
		<div class="alert alert-success">{{name}}</div>
	</script>
	<script id="template-file-name" type="text/x-handlebars-template" data-container="#file-name .controls" data-action="replace">
		<input class="span8" type="text" placeholder="File Name" value="{{filename}}" />
		<div class="btn btn-info">Use Page Headline</div>
	</script>
	<script type="text/javascript">
		var LoginGuid = '<%= session("loginguid") %>';
		var SessionKey = '<%= session("sessionkey") %>';
		var PageGuid = '<%= session("treeguid") %>';
		var RqlConnectorObj = new RqlConnector(LoginGuid, SessionKey);

		$(document).ready(function() {
			var EditFileNameObj = new EditFileName(RqlConnectorObj, SessionKey, PageGuid);
		});
	</script>
</head>
<body>
	<fieldset class="form-horizontal">
		<legend>Edit Page File Name</legend>
		<div class="control-group" id="page-headline">
			<label class="control-label">Page Headline</label>
			<div class="controls">
				<div class="alert alert-warning">Loading...</div>
			</div>
		</div>
		<div class="control-group" id="file-name">
			<label class="control-label">File Name</label>
			<div class="controls">
				<div class="alert alert-warning">Loading...</div>
			</div>
		</div>
		<div class="form-actions">
			<button class="btn btn-success pull-right" id="save">Save</button>
		</div>
	</fieldset>
</body>
</html>