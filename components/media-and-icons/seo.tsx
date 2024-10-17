import type { NextSeoProps } from "next-seo"
import { CONSTANT } from "constant"
import { NextSeo } from "next-seo"
import React from "react"

export type SeoProps = Pick<NextSeoProps, "description" | "title">

export const Seo = ({ description, title }: SeoProps) => (
  <NextSeo
    description={description}
    title={title}
    {...CONSTANT.SEO.NEXT_SEO_PROPS}
  />
)
