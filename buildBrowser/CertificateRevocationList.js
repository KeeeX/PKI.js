"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var asn1js=_interopRequireWildcard(require("asn1js"));var _pvutils=require("pvutils");var _common=require("./common.js");var _AlgorithmIdentifier=_interopRequireDefault(require("./AlgorithmIdentifier.js"));var _RelativeDistinguishedNames=_interopRequireDefault(require("./RelativeDistinguishedNames.js"));var _Time=_interopRequireDefault(require("./Time.js"));var _RevokedCertificate=_interopRequireDefault(require("./RevokedCertificate.js"));var _Extensions=_interopRequireDefault(require("./Extensions.js"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):{};if(desc.get||desc.set){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}}newObj.default=obj;return newObj;}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor;}//**************************************************************************************
function tbsCertList(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};//TBSCertList  ::=  SEQUENCE  {
//    version                 Version OPTIONAL,
//                                 -- if present, MUST be v2
//    signature               AlgorithmIdentifier,
//    issuer                  Name,
//    thisUpdate              Time,
//    nextUpdate              Time OPTIONAL,
//    revokedCertificates     SEQUENCE OF SEQUENCE  {
//        userCertificate         CertificateSerialNumber,
//        revocationDate          Time,
//        crlEntryExtensions      Extensions OPTIONAL
//        -- if present, version MUST be v2
//    }  OPTIONAL,
//    crlExtensions           [0]  EXPLICIT Extensions OPTIONAL
//    -- if present, version MUST be v2
//}
/**
	 * @type {Object}
	 * @property {string} [blockName]
	 * @property {string} [tbsCertListVersion]
	 * @property {string} [signature]
	 * @property {string} [issuer]
	 * @property {string} [tbsCertListThisUpdate]
	 * @property {string} [tbsCertListNextUpdate]
	 * @property {string} [tbsCertListRevokedCertificates]
	 * @property {string} [crlExtensions]
	 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Sequence({name:names.blockName||"tbsCertList",value:[new asn1js.Integer({optional:true,name:names.tbsCertListVersion||"tbsCertList.version",value:2}),// EXPLICIT integer value (v2)
_AlgorithmIdentifier.default.schema(names.signature||{names:{blockName:"tbsCertList.signature"}}),_RelativeDistinguishedNames.default.schema(names.issuer||{names:{blockName:"tbsCertList.issuer"}}),_Time.default.schema(names.tbsCertListThisUpdate||{names:{utcTimeName:"tbsCertList.thisUpdate",generalTimeName:"tbsCertList.thisUpdate"}}),_Time.default.schema(names.tbsCertListNextUpdate||{names:{utcTimeName:"tbsCertList.nextUpdate",generalTimeName:"tbsCertList.nextUpdate"}},true),new asn1js.Sequence({optional:true,value:[new asn1js.Repeated({name:names.tbsCertListRevokedCertificates||"tbsCertList.revokedCertificates",value:new asn1js.Sequence({value:[new asn1js.Integer(),_Time.default.schema(),_Extensions.default.schema({},true)]})})]}),new asn1js.Constructed({optional:true,idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:0// [0]
},value:[_Extensions.default.schema(names.crlExtensions||{names:{blockName:"tbsCertList.extensions"}})]})// EXPLICIT SEQUENCE value
]});}//**************************************************************************************
/**
 * Class from RFC5280
 */var CertificateRevocationList=/*#__PURE__*/function(){//**********************************************************************************
/**
	 * Constructor for Attribute class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */function CertificateRevocationList(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};_classCallCheck(this,CertificateRevocationList);//region Internal properties of the object
/**
		 * @type {ArrayBuffer}
		 * @desc tbs
		 */this.tbs=(0,_pvutils.getParametersValue)(parameters,"tbs",CertificateRevocationList.defaultValues("tbs"));/**
		 * @type {number}
		 * @desc version
		 */this.version=(0,_pvutils.getParametersValue)(parameters,"version",CertificateRevocationList.defaultValues("version"));/**
		 * @type {AlgorithmIdentifier}
		 * @desc signature
		 */this.signature=(0,_pvutils.getParametersValue)(parameters,"signature",CertificateRevocationList.defaultValues("signature"));/**
		 * @type {RelativeDistinguishedNames}
		 * @desc issuer
		 */this.issuer=(0,_pvutils.getParametersValue)(parameters,"issuer",CertificateRevocationList.defaultValues("issuer"));/**
		 * @type {Time}
		 * @desc thisUpdate
		 */this.thisUpdate=(0,_pvutils.getParametersValue)(parameters,"thisUpdate",CertificateRevocationList.defaultValues("thisUpdate"));if("nextUpdate"in parameters)/**
			 * @type {Time}
			 * @desc nextUpdate
			 */this.nextUpdate=(0,_pvutils.getParametersValue)(parameters,"nextUpdate",CertificateRevocationList.defaultValues("nextUpdate"));if("revokedCertificates"in parameters)/**
			 * @type {Array.<RevokedCertificate>}
			 * @desc revokedCertificates
			 */this.revokedCertificates=(0,_pvutils.getParametersValue)(parameters,"revokedCertificates",CertificateRevocationList.defaultValues("revokedCertificates"));if("crlExtensions"in parameters)/**
			 * @type {Extensions}
			 * @desc crlExtensions
			 */this.crlExtensions=(0,_pvutils.getParametersValue)(parameters,"crlExtensions",CertificateRevocationList.defaultValues("crlExtensions"));/**
		 * @type {AlgorithmIdentifier}
		 * @desc signatureAlgorithm
		 */this.signatureAlgorithm=(0,_pvutils.getParametersValue)(parameters,"signatureAlgorithm",CertificateRevocationList.defaultValues("signatureAlgorithm"));/**
		 * @type {BitString}
		 * @desc signatureValue
		 */this.signatureValue=(0,_pvutils.getParametersValue)(parameters,"signatureValue",CertificateRevocationList.defaultValues("signatureValue"));//endregion
//region If input argument array contains "schema" for this object
if("schema"in parameters)this.fromSchema(parameters.schema);//endregion
}//**********************************************************************************
/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */_createClass(CertificateRevocationList,[{key:"fromSchema",//**********************************************************************************
/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */value:function fromSchema(schema){//region Clear input data first
(0,_pvutils.clearProps)(schema,["tbsCertList","tbsCertList.version","tbsCertList.signature","tbsCertList.issuer","tbsCertList.thisUpdate","tbsCertList.nextUpdate","tbsCertList.revokedCertificates","tbsCertList.extensions","signatureAlgorithm","signatureValue"]);//endregion
//region Check the schema is valid
var asn1=asn1js.compareSchema(schema,schema,CertificateRevocationList.schema());if(asn1.verified===false)throw new Error("Object's schema was not verified against input data for CertificateRevocationList");//endregion
//region Get internal properties from parsed schema
// noinspection JSUnresolvedVariable
this.tbs=asn1.result.tbsCertList.valueBeforeDecode;if("tbsCertList.version"in asn1.result)this.version=asn1.result["tbsCertList.version"].valueBlock.valueDec;this.signature=new _AlgorithmIdentifier.default({schema:asn1.result["tbsCertList.signature"]});this.issuer=new _RelativeDistinguishedNames.default({schema:asn1.result["tbsCertList.issuer"]});this.thisUpdate=new _Time.default({schema:asn1.result["tbsCertList.thisUpdate"]});if("tbsCertList.nextUpdate"in asn1.result)this.nextUpdate=new _Time.default({schema:asn1.result["tbsCertList.nextUpdate"]});if("tbsCertList.revokedCertificates"in asn1.result)this.revokedCertificates=Array.from(asn1.result["tbsCertList.revokedCertificates"],function(element){return new _RevokedCertificate.default({schema:element});});if("tbsCertList.extensions"in asn1.result)this.crlExtensions=new _Extensions.default({schema:asn1.result["tbsCertList.extensions"]});this.signatureAlgorithm=new _AlgorithmIdentifier.default({schema:asn1.result.signatureAlgorithm});this.signatureValue=asn1.result.signatureValue;//endregion
}//**********************************************************************************
},{key:"encodeTBS",value:function encodeTBS(){//region Create array for output sequence
var outputArray=[];if(this.version!==CertificateRevocationList.defaultValues("version"))outputArray.push(new asn1js.Integer({value:this.version}));outputArray.push(this.signature.toSchema());outputArray.push(this.issuer.toSchema());outputArray.push(this.thisUpdate.toSchema());if("nextUpdate"in this)outputArray.push(this.nextUpdate.toSchema());if("revokedCertificates"in this){outputArray.push(new asn1js.Sequence({value:Array.from(this.revokedCertificates,function(element){return element.toSchema();})}));}if("crlExtensions"in this){outputArray.push(new asn1js.Constructed({optional:true,idBlock:{tagClass:3,// CONTEXT-SPECIFIC
tagNumber:0// [0]
},value:[this.crlExtensions.toSchema()]}));}//endregion
return new asn1js.Sequence({value:outputArray});}//**********************************************************************************
/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */},{key:"toSchema",value:function toSchema(){var encodeFlag=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;//region Decode stored TBS value
var tbsSchema;if(encodeFlag===false){if(this.tbs.length===0)// No stored TBS part
return CertificateRevocationList.schema();tbsSchema=asn1js.fromBER(this.tbs).result;}//endregion
//region Create TBS schema via assembling from TBS parts
else tbsSchema=this.encodeTBS();//endregion
//region Construct and return new ASN.1 schema for this object
return new asn1js.Sequence({value:[tbsSchema,this.signatureAlgorithm.toSchema(),this.signatureValue]});//endregion
}//**********************************************************************************
/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */},{key:"toJSON",value:function toJSON(){var object={tbs:(0,_pvutils.bufferToHexCodes)(this.tbs,0,this.tbs.byteLength),signature:this.signature.toJSON(),issuer:this.issuer.toJSON(),thisUpdate:this.thisUpdate.toJSON(),signatureAlgorithm:this.signatureAlgorithm.toJSON(),signatureValue:this.signatureValue.toJSON()};if(this.version!==CertificateRevocationList.defaultValues("version"))object.version=this.version;if("nextUpdate"in this)object.nextUpdate=this.nextUpdate.toJSON();if("revokedCertificates"in this)object.revokedCertificates=Array.from(this.revokedCertificates,function(element){return element.toJSON();});if("crlExtensions"in this)object.crlExtensions=this.crlExtensions.toJSON();return object;}//**********************************************************************************
},{key:"isCertificateRevoked",value:function isCertificateRevoked(certificate){//region Check that issuer of the input certificate is the same with issuer of this CRL
if(this.issuer.isEqual(certificate.issuer)===false)return false;//endregion
//region Check that there are revoked certificates in this CRL
if("revokedCertificates"in this===false)return false;//endregion
//region Search for input certificate in revoked certificates array
var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=this.revokedCertificates[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var revokedCertificate=_step.value;if(revokedCertificate.userCertificate.isEqual(certificate.serialNumber))return true;}//endregion
}catch(err){_didIteratorError=true;_iteratorError=err;}finally{try{if(!_iteratorNormalCompletion&&_iterator.return!=null){_iterator.return();}}finally{if(_didIteratorError){throw _iteratorError;}}}return false;}//**********************************************************************************
/**
	 * Make a signature for existing CRL data
	 * @param {Object} privateKey Private key for "subjectPublicKeyInfo" structure
	 * @param {string} [hashAlgorithm] Hashing algorithm. Default SHA-1
	 */},{key:"sign",value:function sign(privateKey){var _this=this;var hashAlgorithm=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"SHA-1";//region Initial checking
//region Get a private key from function parameter
if(typeof privateKey==="undefined")return Promise.reject("Need to provide a private key for signing");//endregion
//endregion
//region Initial variables
var sequence=Promise.resolve();var parameters;var engine=(0,_common.getEngine)();//endregion
//region Get a "default parameters" for current algorithm and set correct signature algorithm
sequence=sequence.then(function(){return engine.subtle.getSignatureParameters(privateKey,hashAlgorithm);});sequence=sequence.then(function(result){parameters=result.parameters;_this.signature=result.signatureAlgorithm;_this.signatureAlgorithm=result.signatureAlgorithm;});//endregion
//region Create TBS data for signing
sequence=sequence.then(function(){_this.tbs=_this.encodeTBS().toBER(false);});//endregion
//region Signing TBS data on provided private key
sequence=sequence.then(function(){return engine.subtle.signWithPrivateKey(_this.tbs,privateKey,parameters);});sequence=sequence.then(function(result){_this.signatureValue=new asn1js.BitString({valueHex:result});});//endregion
return sequence;}//**********************************************************************************
/**
	 * Verify existing signature
	 * @param {{[issuerCertificate]: Object, [publicKeyInfo]: Object}} parameters
	 * @returns {*}
	 */},{key:"verify",value:function verify(){var _this2=this;var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};//region Global variables
var sequence=Promise.resolve();var subjectPublicKeyInfo=-1;var engine=(0,_common.getEngine)();//endregion
//region Get information about CRL issuer certificate
if("issuerCertificate"in parameters)// "issuerCertificate" must be of type "Certificate"
{subjectPublicKeyInfo=parameters.issuerCertificate.subjectPublicKeyInfo;// The CRL issuer name and "issuerCertificate" subject name are not equal
if(this.issuer.isEqual(parameters.issuerCertificate.subject)===false)return Promise.resolve(false);}//region In case if there is only public key during verification
if("publicKeyInfo"in parameters)subjectPublicKeyInfo=parameters.publicKeyInfo;// Must be of type "PublicKeyInfo"
//endregion
if("subjectPublicKey"in subjectPublicKeyInfo===false)return Promise.reject("Issuer's certificate must be provided as an input parameter");//endregion
//region Check the CRL for unknown critical extensions
if("crlExtensions"in this){var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=this.crlExtensions.extensions[Symbol.iterator](),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var extension=_step2.value;if(extension.critical){// We can not be sure that unknown extension has no value for CRL signature
if("parsedValue"in extension===false)return Promise.resolve(false);}}}catch(err){_didIteratorError2=true;_iteratorError2=err;}finally{try{if(!_iteratorNormalCompletion2&&_iterator2.return!=null){_iterator2.return();}}finally{if(_didIteratorError2){throw _iteratorError2;}}}}//endregion
sequence=sequence.then(function(){return engine.subtle.verifyWithPublicKey(_this2.tbs,_this2.signatureValue,subjectPublicKeyInfo,_this2.signatureAlgorithm);});return sequence;}//**********************************************************************************
}],[{key:"defaultValues",value:function defaultValues(memberName){switch(memberName){case"tbs":return new ArrayBuffer(0);case"version":return 1;case"signature":return new _AlgorithmIdentifier.default();case"issuer":return new _RelativeDistinguishedNames.default();case"thisUpdate":return new _Time.default();case"nextUpdate":return new _Time.default();case"revokedCertificates":return[];case"crlExtensions":return new _Extensions.default();case"signatureAlgorithm":return new _AlgorithmIdentifier.default();case"signatureValue":return new asn1js.BitString();default:throw new Error("Invalid member name for CertificateRevocationList class: ".concat(memberName));}}//**********************************************************************************
/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * CertificateList  ::=  SEQUENCE  {
	 *    tbsCertList          TBSCertList,
	 *    signatureAlgorithm   AlgorithmIdentifier,
	 *    signatureValue       BIT STRING  }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */},{key:"schema",value:function schema(){var parameters=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [signatureAlgorithm]
		 * @property {string} [signatureValue]
		 */var names=(0,_pvutils.getParametersValue)(parameters,"names",{});return new asn1js.Sequence({name:names.blockName||"CertificateList",value:[tbsCertList(parameters),_AlgorithmIdentifier.default.schema(names.signatureAlgorithm||{names:{blockName:"signatureAlgorithm"}}),new asn1js.BitString({name:names.signatureValue||"signatureValue"})]});}}]);return CertificateRevocationList;}();//**************************************************************************************
exports.default=CertificateRevocationList;
//# sourceMappingURL=CertificateRevocationList.js.map