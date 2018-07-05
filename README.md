# ding-dong

A door bell notification endpoint.

## Info

Posts a message on Twitter when called.

Limits posts to once a minute.

## Set Up

Configure a [Twitter app][0].

Copy `example_config.json` to `config.json`.

Replace the values in `config.json/auth` with the keys from the Twitter app step.

Replace the values in `config.json/post.contents` with a list of what you would like the bot to post.
It picks one at random, without repeat.

Install dependencies with `npm i`.

## Usage Stand Alone

Run the program with `npm start`.

## Usage Via Import

The `dingdong.js` module exposes a `handler` function.

This function requires two parameters:

* `event` which is unused
* `context` which must contain:
* * `done` a function called on success
* * `fail(err)` a function called on failure

Example usage can be seen in `callit.js`.

## Deployment to AWS Lambda

Zip the contents of the folder.

Upload the zip to [AWS Lambda][1].

Update the `handler` to `dingdong.handler`.

## Configure AWS for Browser Requests

Create an [AWS Cognito Identity Pool][2].

Allow unauthenticated requests (or not).

Modify the associated AWS IAM role with the following policy:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": "lambda:InvokeFunction",
            "Resource": "arn:aws:lambda:xx-xxxx-x:xxxxxxxxxxxx:function:dingdong"
        }
    ]
}
```

Use the following in your browser JavaScript where appropriate:

```javascript
AWS.config.update({region: 'REGION'});
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: 'IDENTITY_POOL_ID'});

var lambda = new AWS.Lambda({region: REGION, apiVersion: '2015-03-31'});
var pullParams = {
  FunctionName : 'FUNCTION_NAME',
  InvocationType : 'RequestResponse',
  LogType : 'None'
};

lambda.invoke(pullParams, function(error, data) {
  if (error) {
    // Fail
    console.log(error);
  } else {
    // Success
  }
});
```

[0]: https://apps.twitter.com/
[1]: https://aws.amazon.com/documentation/lambda/
[2]: https://aws.amazon.com/documentation/cognito/