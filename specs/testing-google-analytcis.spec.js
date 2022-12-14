
/**
 * Generated by https://github.com/dsheiko/puppetry
 * on Sun Nov 20 2022 21:39:20 GMT+0900 (日本標準時)
 * Suite: Sandbox GA
 */

var nVer = process.version.match( /^v(\d+)/ );
if ( !nVer || nVer[ 1 ] < 9 ) {
  console.error( "WARNING: You have an outdated Node.js version " + process.version
    + ". You need at least v.9.x to run this test suite." );
}


const {
        bs, util, fetch, localStorage
      } = require( "../lib/bootstrap" )( "Sandbox--GA" ),
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
bs.TARGETS[ "ADD_TO_CART_BTN" ] = async () => await bs.query( "#addtocartwhite", true, "ADD_TO_CART_BTN" );
bs.TARGETS[ "CHECKOUT_BTN" ] = async () => await bs.query( "#checkoutbtn", true, "CHECKOUT_BTN" );
bs.TARGETS[ "PROCEED_BTN" ] = async () => await bs.query( "#proceedbtn", true, "PROCEED_BTN" );
bs.TARGETS[ "PURCHASE_BTN" ] = async () => await bs.query( "#purchasebtn", true, "PURCHASE_BTN" );
bs.TARGETS[ "PAYMENT_METHOD_SELECT" ] = async () => await bs.query( "#paymentmethod", true, "PAYMENT_METHOD_SELECT" );

describe( "Sandbox GA", () => {
  beforeAll(async () => {
    await bs.setup( puppeteerOptions, {"allure":false,"requireInterceptTraffic":true});
    await util.once(async () => {
      bs.browser && console.log( "BROWSER: ", await bs.browser.version() );
      await util.savePuppetterInfo( bs );
    });

    bs.page.on( "console", ( message ) => consoleLog.push( message ) );
    bs.page.on( "dialog", ( dialog ) => dialogLog.push( dialog ) );

    
    bs.performance.watchTraffic();

    
  });

  afterAll(async () => {

    await bs.teardown();
  });


  describe( "Google Analytics Measurement", () => {

    test( "Page view {dduk2fx8bwf}", async () => {
      let result, assert, searchStr, localEnv;

      // Defining browser viewport
      await bs.page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
        isMobile: false,
        hasTouch: false,
        isLandscape: false
      });
  

      // Navigating to {{ SANDBOX_BASEURL }}
      bs.performance.reset();
      await bs.page.goto( `${ ENV[ "SANDBOX_BASEURL" ] }`, {"timeout":30000,"waitUntil":"load"} );
    
      
      // Asserting GA tracking
      
      result = bs.getGaTracking();       
      expect( result ).toMatchGaTracking( {
        "action": "pageview"
      }, "page.assertGaTracking" );
    });


    test( "Ecommerce {3i0k2fy6u0g}", async () => {
      let result, assert, searchStr, localEnv;

      // Defining browser viewport
      await bs.page.setViewport({
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
        isMobile: false,
        hasTouch: false,
        isLandscape: false
      });
  

      // Navigating to {{ SANDBOX_BASEURL }}
      bs.performance.reset();
      await bs.page.goto( `${ ENV[ "SANDBOX_BASEURL" ] }`, {"timeout":30000,"waitUntil":"load"} );
    

      // Emulating mouse click
      await ( await bs.getTarget( "ADD_TO_CART_BTN" ) ).click( {"button":"left","clickCount":1,"delay":0} );

      // Waiting for 300 ms
      await bs.page.waitFor( 300 );
  

      // Taking screenshot of the page
      await bs.page.screenshot( util.png( "3i0k2fy7pzq", null, "Shopping cart" ) );

      
      // Asserting GA tracking
      
      result = bs.getGaTracking();       
      expect( result ).toMatchGaTracking( {
        "action": "ecAddToCart",
        "productCountAssertion": "equals",
        "productCountValue": 1
      }, "page.assertGaTracking" );

      // Emulating mouse click
      await ( await bs.getTarget( "CHECKOUT_BTN" ) ).click( {"button":"left","clickCount":1,"delay":0} );

      // Waiting for 300 ms
      await bs.page.waitFor( 300 );
  

      // Taking screenshot of the page
      await bs.page.screenshot( util.png( "3i0k2fy9kx1", null, "Checkout" ) );

      
      // Asserting GA tracking
      
      result = bs.getGaTracking();       
      expect( result ).toMatchGaTracking( {
        "action": "ecCheckout",
        "stepAssertion": "any",
        "optionAssertion": "any",
        "eventActionAssertion": "equals",
        "eventActionValue": "begin_checkout",
        "productCountAssertion": "equals",
        "productCountValue": 1
      }, "page.assertGaTracking" );
      
      // Emulating select
      await bs.page.select( "#paymentmethod", "Visa" );

      // Emulating mouse click
      await ( await bs.getTarget( "PROCEED_BTN" ) ).click( {"button":"left","clickCount":1,"delay":0} );

      // Waiting for 300 ms
      await bs.page.waitFor( 300 );
  

      // Taking screenshot of the page
      await bs.page.screenshot( util.png( "mlak2fzg4qp", null, "Payment method" ) );

      
      // Asserting GA tracking
      
      result = bs.getGaTracking();       
      expect( result ).toMatchGaTracking( {
        "action": "ecCheckout",
        "stepAssertion": "equals",
        "stepValue": 1,
        "optionAssertion": "any",
        "eventActionAssertion": "equals",
        "eventActionValue": "set_checkout_option",
        "productCountAssertion": "any"
      }, "page.assertGaTracking" );

      // Emulating mouse click
      await ( await bs.getTarget( "PURCHASE_BTN" ) ).click( {"button":"left","clickCount":1,"delay":0} );

      // Waiting for 300 ms
      await bs.page.waitFor( 300 );
  
      
      // Asserting GA tracking
      
      result = bs.getGaTracking();       
      expect( result ).toMatchGaTracking( {
        "action": "ecPurchase",
        "idAssertion": "contains",
        "idValue": "24.",
        "affiliationAssertion": "any",
        "revenueAssertion": "any",
        "taxAssertion": "any",
        "shippingAssertion": "any",
        "couponAssertion": "any",
        "productCountAssertion": "equals",
        "productCountValue": 1
      }, "page.assertGaTracking" );
    });

  });


});
