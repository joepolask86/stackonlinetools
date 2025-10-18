<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
    <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Sitemap - Stack Online Tools</title>
        <style type="text/css">
            body{font-family: Arial, sans-serif; background-color: #f9f9f9; margin:0;padding:0;line-height:1.6}
            .container{ margin:0 12px; }
            h1{color:#2e6da4;border-bottom:3px solid #2e6da4}
            .info{padding:0 30px 20px 5px;font-size:1rem}
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 10px 12px; border: 1px solid #ddd; text-align: left; }
            th { background-color: #f2f2f2; }
            tbody tr:hover{background-color:#f2f2f2}
            td a {text-decoration:none;font-weight:500}
            td a:hover{color:#1d4ed8;text-decoration:underline}
        </style>
    </head>
    <body>
        <div class="container">
            <h1>XML Sitemap</h1>
            <div class="info">
                Complete list of all pages on Stack Online Tools. This sitemap contains <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong> URLs.
            </div>
            <table>
                <thead>
                    <tr>
                        <th>URL</th>
                        <th>Last Modified</th>
                    </tr>
                </thead>
                <tbody>
                    <xsl:for-each select="sitemap:urlset/sitemap:url">
                        <tr>
                            <td class="url-cell">
                                <a href="{sitemap:loc}">
                                    <xsl:value-of select="sitemap:loc"/>
                                </a>
                            </td>
                            <td class="date-cell">
                                <xsl:value-of select="sitemap:lastmod"/>
                            </td>
                        </tr>
                    </xsl:for-each>
                </tbody>
            </table>
        </div>
    </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
