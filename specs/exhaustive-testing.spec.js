
/**
 * Generated by https://github.com/dsheiko/puppetry
 * on Sun Nov 20 2022 21:39:20 GMT+0900 (日本標準時)
 * Suite: Exhaustive Testing Example
 */

var nVer = process.version.match( /^v(\d+)/ );
if ( !nVer || nVer[ 1 ] < 9 ) {
  console.error( "WARNING: You have an outdated Node.js version " + process.version
    + ". You need at least v.9.x to run this test suite." );
}


const {
        bs, util, fetch, localStorage
      } = require( "../lib/bootstrap" )( "Exhaustive--Testing--Example" ),
      puppeteerOptions = require( "../puppeteer.config.json" ),
      devices = require( "puppeteer" ).devices,
      fs = require( "fs" ),
      path = require( "path" ),
      os = require( "os" );




jest.setTimeout( 50000 );

let consoleLog = [], // assetConsoleMessage
    dialogLog = []; // assertDialog;

bs.TARGETS = {};

// Environment variables
let ENV = {
  "SANDBOX_BASEURL": "https://puppetry.app/demo/"
};

bs.TARGETS[ "FIRSTNAME_INPUT" ] = async () => await bs.query( "#fname", true, "FIRSTNAME_INPUT" );
bs.TARGETS[ "LASTNAME_INPUT" ] = async () => await bs.query( "#lname", true, "LASTNAME_INPUT" );
bs.TARGETS[ "MESSAGE_INPUT" ] = async () => await bs.query( "#comment", true, "MESSAGE_INPUT" );
bs.TARGETS[ "CONSENT_CHECKBOX" ] = async () => await bs.query( "#consent", true, "CONSENT_CHECKBOX" );
bs.TARGETS[ "OPTION_RADIO_1" ] = async () => await bs.query( "#option1", true, "OPTION_RADIO_1" );
bs.TARGETS[ "ATTACHMENT_FILE" ] = async () => await bs.query( "#attachment", true, "ATTACHMENT_FILE" );
bs.TARGETS[ "FORM" ] = async () => await bs.query( "#form", true, "FORM" );
bs.TARGETS[ "SUBMIT_BTN" ] = async () => await bs.query( "#submit", true, "SUBMIT_BTN" );

describe( "Exhaustive Testing Example", () => {
  beforeAll(async () => {
    await bs.setup( puppeteerOptions, {"allure":false});
    await util.once(async () => {
      bs.browser && console.log( "BROWSER: ", await bs.browser.version() );
      await util.savePuppetterInfo( bs );
    });

    bs.page.on( "console", ( message ) => consoleLog.push( message ) );
    bs.page.on( "dialog", ( dialog ) => dialogLog.push( dialog ) );

    
    

    
  });

  afterAll(async () => {

    await bs.teardown();
  });


  describe( "Form", () => {

    test( "Seeding the form {8fzk2g5fxnj}", async () => {
      let result, assert, searchStr, localEnv;

      // Defining browser viewport
      await bs.page.setViewport({
        width: 1440,
        height: 900,
        deviceScaleFactor: 1,
        isMobile: false,
        hasTouch: false,
        isLandscape: false
      });
  

      // Navigating to {{ SANDBOX_BASEURL }}
      bs.performance.reset();
      await bs.page.goto( `${ ENV[ "SANDBOX_BASEURL" ] }`, {"timeout":30000,"waitUntil":"load"} );
    

      // Handle dialog
      bs.page.on( "dialog", async( dialog ) => {
        let result = dialog.message();
        if ( "any" !== "any" && dialog.type() !== "any" ) {
          return;
        }
        if ( undefined && !result.includes( undefined ) ) {
          return;
        }
        await dialog.dismiss();
        
      });
  
      // SNIPPET Fill out the form: START
      localEnv = Object.assign( {}, ENV );
      Object.assign( ENV, {"FIRST_NAME":"Latin script"} );
      
      // Reset the input or form
      await bs.page.$eval( '#form', el => {
        if ( el.tagName === "FORM" ) {
          el.reset();
          return;
        }
        if ( "value" in el ) {
          el.value = "";
        }
      });
      
      // Emulating user input
      await ( await bs.getTarget( "FIRSTNAME_INPUT" ) ).type( `${ ENV[ "FIRST_NAME" ] }` );
      
      // Emulating user input
      await ( await bs.getTarget( "LASTNAME_INPUT" ) ).type( "Doe" );
      
      // Emulating user input
      await ( await bs.getTarget( "MESSAGE_INPUT" ) ).type( `${ util.exp.fake( "lorem.sentence", "en" ) }` );
      
      // Changing checkbox/radio state
      await bs.page.$eval( '#consent',
        ( el, value ) => {
          if ( value === "false" ) {
            return el.removeAttribute( "checked" );
          }
          el.setAttribute( "checked", value );
          }, "false" );
      
      // Changing checkbox/radio state
      await bs.page.$eval( '#option1',
        ( el, value ) => {
          if ( value === "false" ) {
            return el.removeAttribute( "checked" );
          }
          el.setAttribute( "checked", value );
          }, "false" );

      // Upload input[type=file]
      result = util.generateTmpUploadFile( "attachment.txt", 10000 );
      await ( await bs.getTarget( "ATTACHMENT_FILE" ) ).uploadFile( result );

      // Emulating mouse click
      await ( await bs.getTarget( "SUBMIT_BTN" ) ).click( {"button":"left","clickCount":1,"delay":0} );

      // Taking screenshot of the page
      await bs.page.screenshot( util.png( "8fzk2g5tyvk", "8fzk2g5m0pq", `Seed ${ util.exp.counter( "8fzk2g5tyvk" ) }` ) );

      ENV = Object.assign( {}, localEnv );
      // SNIPPET Fill out the form: END

      
      
      // Asserting dialog
      result = dialogLog
        .filter( dialog => ( "alert" === "any" || dialog.type() === "alert" ) )
        .map( dialog => dialog.message() );
           
            expect( result ).toHaveString( "OK", "to find dialogs of type \"alert\" with message \"OK\"", "page.assertDialog" );
      dialogLog = [];
      
      // SNIPPET Fill out the form: START
      localEnv = Object.assign( {}, ENV );
      Object.assign( ENV, {"FIRST_NAME":"αßÁáÀàÅåÄäæ"} );
      
      // Reset the input or form
      await bs.page.$eval( '#form', el => {
        if ( el.tagName === "FORM" ) {
          el.reset();
          return;
        }
        if ( "value" in el ) {
          el.value = "";
        }
      });
      
      // Emulating user input
      await ( await bs.getTarget( "FIRSTNAME_INPUT" ) ).type( `${ ENV[ "FIRST_NAME" ] }` );
      
      // Emulating user input
      await ( await bs.getTarget( "LASTNAME_INPUT" ) ).type( "Doe" );
      
      // Emulating user input
      await ( await bs.getTarget( "MESSAGE_INPUT" ) ).type( `${ util.exp.fake( "lorem.sentence", "en" ) }` );
      
      // Changing checkbox/radio state
      await bs.page.$eval( '#consent',
        ( el, value ) => {
          if ( value === "false" ) {
            return el.removeAttribute( "checked" );
          }
          el.setAttribute( "checked", value );
          }, "false" );
      
      // Changing checkbox/radio state
      await bs.page.$eval( '#option1',
        ( el, value ) => {
          if ( value === "false" ) {
            return el.removeAttribute( "checked" );
          }
          el.setAttribute( "checked", value );
          }, "false" );

      // Upload input[type=file]
      result = util.generateTmpUploadFile( "attachment.txt", 10000 );
      await ( await bs.getTarget( "ATTACHMENT_FILE" ) ).uploadFile( result );

      // Emulating mouse click
      await ( await bs.getTarget( "SUBMIT_BTN" ) ).click( {"button":"left","clickCount":1,"delay":0} );

      // Taking screenshot of the page
      await bs.page.screenshot( util.png( "8fzk2g5tyvk", "8fzk2g5m5ie", `Seed ${ util.exp.counter( "8fzk2g5tyvk" ) }` ) );

      ENV = Object.assign( {}, localEnv );
      // SNIPPET Fill out the form: END

      
      
      // Asserting dialog
      result = dialogLog
        .filter( dialog => ( "alert" === "any" || dialog.type() === "alert" ) )
        .map( dialog => dialog.message() );
           
            expect( result ).toHaveString( "OK", "to find dialogs of type \"alert\" with message \"OK\"", "page.assertDialog" );
      dialogLog = [];
      
      // SNIPPET Fill out the form: START
      localEnv = Object.assign( {}, ENV );
      Object.assign( ENV, {"FIRST_NAME":"⌚😀⏳☀️"} );
      
      // Reset the input or form
      await bs.page.$eval( '#form', el => {
        if ( el.tagName === "FORM" ) {
          el.reset();
          return;
        }
        if ( "value" in el ) {
          el.value = "";
        }
      });
      
      // Emulating user input
      await ( await bs.getTarget( "FIRSTNAME_INPUT" ) ).type( `${ ENV[ "FIRST_NAME" ] }` );
      
      // Emulating user input
      await ( await bs.getTarget( "LASTNAME_INPUT" ) ).type( "Doe" );
      
      // Emulating user input
      await ( await bs.getTarget( "MESSAGE_INPUT" ) ).type( `${ util.exp.fake( "lorem.sentence", "en" ) }` );
      
      // Changing checkbox/radio state
      await bs.page.$eval( '#consent',
        ( el, value ) => {
          if ( value === "false" ) {
            return el.removeAttribute( "checked" );
          }
          el.setAttribute( "checked", value );
          }, "false" );
      
      // Changing checkbox/radio state
      await bs.page.$eval( '#option1',
        ( el, value ) => {
          if ( value === "false" ) {
            return el.removeAttribute( "checked" );
          }
          el.setAttribute( "checked", value );
          }, "false" );

      // Upload input[type=file]
      result = util.generateTmpUploadFile( "attachment.txt", 10000 );
      await ( await bs.getTarget( "ATTACHMENT_FILE" ) ).uploadFile( result );

      // Emulating mouse click
      await ( await bs.getTarget( "SUBMIT_BTN" ) ).click( {"button":"left","clickCount":1,"delay":0} );

      // Taking screenshot of the page
      await bs.page.screenshot( util.png( "8fzk2g5tyvk", "8fzk2g5m7rt", `Seed ${ util.exp.counter( "8fzk2g5tyvk" ) }` ) );

      ENV = Object.assign( {}, localEnv );
      // SNIPPET Fill out the form: END

      
      
      // Asserting dialog
      result = dialogLog
        .filter( dialog => ( "alert" === "any" || dialog.type() === "alert" ) )
        .map( dialog => dialog.message() );
           
            expect( result ).toHaveString( "OK", "to find dialogs of type \"alert\" with message \"OK\"", "page.assertDialog" );
      dialogLog = [];
      
    });

  });


});
