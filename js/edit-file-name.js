function EditFileName(RqlConnectorObj, SessionKey, PageGuid) {
	var ThisClass = this;
	this.RqlConnectorObj = RqlConnectorObj;
	this.SessionKey = SessionKey;
	
	this.TemplatePageHeadline = '#template-page-headline';
	this.TemplateFileName = '#template-file-name';
	
	this.PopulatePageInfo(PageGuid);
	
	var FileNameContainer = $(this.TemplateFileName).attr('data-container');
	$(FileNameContainer).on('click', '.btn', function(){
		var PageHeadlineContainer = $(ThisClass.TemplatePageHeadline).attr('data-container');
		var PageHeadline = $(PageHeadlineContainer).text();

		ThisClass.AssignPageHeadlineAsFileName(PageHeadline);
	});
	
	$('.form-actions').on('click', '#save', function(){
		var FileNameContainer = $(ThisClass.TemplateFileName).attr('data-container');
		var FileName = $(FileNameContainer).find('input').val();

		ThisClass.SaveFileName(PageGuid, FileName);
	});
}

EditFileName.prototype.PopulatePageInfo = function(PageGuid) {
	var ThisClass = this;
	
	var RqlXml = '<PAGE action="load" guid="' + PageGuid + '"/>';
	this.RqlConnectorObj.SendRql(RqlXml, false, function(data){
		var PageHeadline = $(data).find('PAGE').attr('headline');
		var FileName = $(data).find('PAGE').attr('name');
		var PageObj = {name: PageHeadline, filename: FileName};

		ThisClass.UpdateArea(ThisClass.TemplatePageHeadline, PageObj);
		ThisClass.UpdateArea(ThisClass.TemplateFileName, PageObj);
	});
}

EditFileName.prototype.AssignPageHeadlineAsFileName = function(PageHeadline) {
	PageHeadline = $.trim(PageHeadline);
	PageHeadline = PageHeadline.replace(/[^a-zA-Z0-9_-]+/g, '-');
	
	var FileNameContainer = $(this.TemplateFileName).attr('data-container');
	$(FileNameContainer).find('input').val(PageHeadline);
}

EditFileName.prototype.SaveFileName = function(PageGuid, FileName) {
	var ThisClass = this;

	FileName = $.trim(FileName);
	if(FileName == '')
	{
		FileName = '#' + this.SessionKey;
	}
	
	var RqlXml = '<PAGE action="save" guid="' + PageGuid + '" name="' + FileName + '"/>';
	RqlConnectorObj.SendRql(RqlXml, false, function(data){
		// saved
		self.close();
	});
}

EditFileName.prototype.UpdateArea = function(TemplateId, Data){
	var ContainerId = $(TemplateId).attr('data-container');
	var TemplateAction = $(TemplateId).attr('data-action');
	var Template = Handlebars.compile($(TemplateId).html());
	var TemplateData = Template(Data);

	if((TemplateAction == 'append') || (TemplateAction == 'replace'))
	{
		if (TemplateAction == 'replace') {
			$(ContainerId).empty();
		}

		$(ContainerId).append(TemplateData);
	}

	if(TemplateAction == 'prepend')
	{
		$(ContainerId).prepend(TemplateData);
	}

	if(TemplateAction == 'after')
	{
		$(ContainerId).after(TemplateData);
	}
}