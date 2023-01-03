export default token => `<!DOCTYPE html>
<html lang="en">
 

<head>
    <!-- The title is useful for screenreaders reading a document. Use your sender name or subject line. -->
        <title>Welcome to LinkBun</title>
       
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1">
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
        body,
        table,
        td,
        a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table,
        td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            -ms-interpolation-mode: bicubic;
        }

        /* RESET STYLES */
        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }

        table {
            border-collapse: collapse !important;
        }

        body {
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
        }

        /* iOS BLUE LINKS */
        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        /* GMAIL BLUE LINKS */
        u+#body a {
            color: inherit;
            text-decoration: none;
            font-size: inherit;
            font-family: inherit;
            font-weight: inherit;
            line-height: inherit;
        }

        /* SAMSUNG MAIL BLUE LINKS */
        #MessageViewBody a {
            color: inherit;
            text-decoration: none;
            font-size: inherit;
            font-family: inherit;
            font-weight: inherit;
            line-height: inherit;
        }

        /* These rules set the link and hover states, making it clear that links are, in fact, links. */
        /* Embrace established conventions like underlines on links to keep emails accessible. */
        a {
            color: #e63946;
            font-weight: 600;
            text-decoration: underline;
        }

        a:hover {
            color: #000000 !important;
            text-decoration: none !important;
        }

        a.button:hover {
            color: #ffffff !important;
            background-color: #000000 !important;
        }

        /* These rules adjust styles for desktop devices, keeping the email responsive for users. */
        /* Some email clients don't properly apply media query-based styles, which is why we go mobile-first. */
        @media screen and (min-width:600px) {
            h1 {
                font-size: 48px !important;
                line-height: 48px !important;
            }

            .intro {
                font-size: 24px !important;
                line-height: 36px !important;
            }
        }
    </style>
     
</head>
 

<body style="margin: 0 !important; padding: 0 !important;">

    <!-- Some preview text. -->
    <div style="display: none; max-height: 0; overflow: hidden;">
        Verify your account at LinkBun by following the link in the email.
    </div>
    <!-- Get rid of unwanted preview text. -->
    <div style="display: none; max-height: 0px; overflow: hidden;">
        &nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;
    </div>

    <!-- This ghost table is used to constrain the width in Outlook. The role attribute is set to presentation to prevent it from being read by screenreaders. -->
    <!--[if (gte mso 9)|(IE)]>
    <table cellspacing="0" cellpadding="0" border="0" width="600" align="center" role="presentation"><tr><td>
    <![endif]-->
    <!-- The role and aria-label attributes are added to wrap the email content as an article for screen readers. Some of them will read out the aria-label as the title of the document, so use something like "An email from Your Brand Name" to make it recognizable. -->
    <!-- Default styling of text is applied to the wrapper div. Be sure to use text that is large enough and has a high contrast with the background color for people with visual impairments. -->
    <div role="article" aria-label="An email from LinkBun" lang="en"
        style="background-color: white; color: #2b2b2b; font-family: 'Avenir Next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; font-size: 18px; font-weight: 400; line-height: 28px; margin: 0 auto; max-width: 600px; padding: 40px 20px 40px 20px;">

        <!-- Logo section and header. Headers are useful landmark elements. -->
        <header>
            <!-- Since this is a purely decorative image, we can leave the alternative text blank. -->
            <!-- Linking images also helps with Gmail displaying download links next to them. -->
            <a href="https://linkbun.io">
                <center><img
                        src="cid:logo"
                        alt="" height="80" width="80"></center>
            </a>
            <!-- The h1 is the main heading of the document and should come first. -->
            <!-- We can override the default styles inline. -->
            <h1
                style="color: #333333; font-size: 32px; font-weight: 800; line-height: 32px; margin: 48px 0; text-align: center;">
                Welcome to LinkBun!
            </h1>
        </header>

        <!-- Main content section. Main is a useful landmark element. -->
        <main>
            <!-- Since this is a purely decorative image, we can leave the alternative text blank. -->
            <!-- Linking images also helps with Gmail displaying download links next to them. -->
            <a href="https://linkbun.io/"><img alt=""
                    src="cid:welcome"
                    width="600"
                    style="border: 0; border-radius: 4px; display: block; max-width: 100%; min-width: 100px; width: 100%;"></a>
            <!-- A level 2 heading is used to keep the document order correct. -->
            <h2
                style="color: #000000; font-size: 28px; font-weight: 600; line-height: 32px; margin: 48px 0 24px 0; text-align: center;">
                Verify your account!
            </h2>
            <p>
                Your first link collection is around the corner, you just need to verify your account with the button
                below. We just wanted to let you know how this will affect your everyday life!
            </p>
            <!-- This paragraph uses column-count for multiple columns. A more robust solution would require more tables... -->
            <p style="column-count: 2; line-height: 4; text-align: center;">
                😁 Happier friends!<br>
                🥳 Parties every day!<br>
                ❤️ No more frustration!<br>
                💌 Fabulous newsletters!<br>
                🦻 Screenreader friendly!<br>
                💬 Fantastic linking!
            </p>
            <!-- This CTA was adapted from code from Campaign Monitor's buttons.cm. -->
            <center>
                <div style="margin: 48px 0;">
                    <!--[if mso]>
                <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://linkbun.io/quick" style="height:60px;v-text-anchor:middle;width:300px;" arcsize="10%" stroke="f" fillcolor="#e63946">
                <w:anchorlock/>
                <center>
                <![endif]-->
                    <a class="button" href="https://linkbun.io/app/activate-account?token=${token}"
                        style="background-color:#e63946;border-radius:4px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:18px;font-weight:bold;line-height:60px;text-align:center;text-decoration:none;width:300px;-webkit-text-size-adjust:none;">
                        Verify Account Now</a>
                    <!--[if mso]>
                </center>
                </v:roundrect>
                <![endif]-->
                </div>
            </center>
        </main>
        <br><br>
        <!-- Footer information. Footer is a useful landmark element. -->
        <footer>
            <div style="border-top: 2px solid #eaeaea; padding: 40px 0 0 0;">
                <!-- This link uses descriptive text to inform the user what will happen with the link is tapped. -->
                <!-- It also uses inline styles since some email clients won't render embedded styles from the head. -->
                <p style="font-size: 16px; font-weight: 400; line-height: 24px; margin-top: 48px;">
                    You received this email because you signed up for an account on <a href="https://linkbun.io/"
                        style="color: #e63946; text-decoration: underline;">linkbun.io</a>. Was this not you? Then you
                    do not need to do anything since no one can activate the account except you.
                </p>

                <!-- The address element does exactly what it says. By default, it is block-level and italicizes text. You can override this behavior inline. -->
                <address style="font-size: 16px; font-style: normal; font-weight: 400; line-height: 24px;">
                    <strong>Your Friends at LinkBun</strong>
                </address>
            </div>
        </footer>

    </div>
    <!--[if (gte mso 9)|(IE)]>
    </td></tr></table>
    <![endif]-->
     
</body>

</html>
`
