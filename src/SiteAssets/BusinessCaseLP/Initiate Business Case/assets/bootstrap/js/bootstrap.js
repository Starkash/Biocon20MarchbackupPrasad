<!DOCTYPE html><html xml:lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:Web="http://schemas.live.com/Web/"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/><title>Sharepoint Online</title><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/><meta name="viewport" content="width=device-width, initial-scale=1"/></head><body><style>
  body,html {
    font: 18px/normal "Segoe UI",Arial,Helvetica,Sans-Serif;
    line-height: 23px;
    color: #333333;
    background: #F3F3F3 !important;
  }
  a {
    color: #3366BB;
    text-decoration: none;
    white-space: nowrap;
  }
  #sw_content {
    width: 760px;
    height: auto;
    margin: 0 auto;
    padding: 0;
    margin-bottom: 150px;
    background: #F3F3F3;
  }
  .panda { margin-top: 60px;}
  .panda img {
    width: 350px;
    height: 223px;
  }

  .title {
    font-size: 38px;
    line-height: 48px;
    color: #777777;
    text-align: center;
    margin-top: 30px;
    font-family: "Segoe UI",Arial,Helvetica,Sans-Serif;
  }
  .sc_errD {
    font-size: 13px;
    line-height: 16px;
    color: #777777;
    text-align: left;
    margin-top: 20px;
    white-space: nowrap
  }
  .sc_error {
      margin-top: 10px;
      padding: 0 20px;
  }
  .sc_error p{ margin: 18px 0px; }
  .bing_logo { margin-top: 25px; }
  .panda, .bing_logo, .sc_error{ text-align: center;}
  #b_header { display: none; }
  a:hover{text-decoration: underline;}

  @media(max-width: 736px){
       body{font-family: HelveticaNeue, Roboto, Arial, sans-serif;}
      .panda { margin-top: 60px;}
      .panda img {
        width: 225px;
        height: 143px;
      }
      .title {
        margin-top: 20px;
        font-family: HelveticaNeue, Roboto, Arial, sans-serif;;
        font-size: 23px;
        line-height: 28px;
        color: #333333;
      }
      .sc_errD, .sc_error p {
        font-size: 13px;
        line-height: 16px;
      }
     .sc_error { margin-top: 5px; }
     .sc_error p{ margin: 0px;}
     .bing_logo { margin-top: 20px; }
     #sw_content{ width: auto;}
  }
</style><div id="sw_content"><div class="panda" data-tag="bing_panda"><img src="data:image/png;base64,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"/></div><div class="title">Something went wrong</div><div class="sc_error"><p>This is a temporary issue, so try again in a few minutes.</p></div>
<div class="sc_errD" data-tag="refcode"><p>Technical details:</><p>Ref A: 53B729AADDCB4C5C924AC767A6971D0F Ref B: NAG20EDGE0112 Ref C: 2024-06-25T13:23:12Z</p></div><div class="bing_logo"></div></div><!--AppServer--></body></html></body></html>