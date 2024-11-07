const { PrismaClient } = require('@prisma/client')

interface LemonProduct {
  type: string
  id: string
  attributes: {
    name: string
    description: string
    status: string
  }
}

interface LemonVariant {
  type: string
  id: string
  attributes: {
    price: number | null
    interval: string
    interval_count: number
    product_id: number
    name: string
    status: string
    sort: number
  }
}

async function syncPlans(
  prisma: typeof PrismaClient,
  products: LemonProduct[],
  variants: LemonVariant[]
) {
  // Helper function to extract features from description
  const extractFeatures = (description: string): string[] => {
    const cleanDescription = description.replace(/<\/?[^>]+(>|$)/g, '')
    return cleanDescription
      .split('•')
      .map(f => f.trim())
      .filter(f => f.length > 0)
  }

  // Map interval names
  const mapInterval = (interval: string, count: number): string => {
    if (interval === 'month' && count === 1) return 'monthly'
    if (interval === 'month' && count === 6) return 'biannually'
    if (interval === 'year' && count === 1) return 'annually'
    return `${interval}-${count}`
  }

  // Process each product and its variants
  for (const product of products) {
    const productVariants = variants.filter(
      v => v.attributes.product_id.toString() === product.id
    )

    for (const variant of productVariants) {
      if (variant.attributes.status !== 'published') continue

      const planData = {
        lemonId: product.id,
        variantId: variant.id,
        name: product.attributes.name,
        description: product.attributes.description.replace(/<\/?[^>]+(>|$)/g, ''),
        features: extractFeatures(product.attributes.description),
        price: variant.attributes.price === null ? 999999 : variant.attributes.price,
        interval: mapInterval(
          variant.attributes.interval,
          variant.attributes.interval_count
        ),
        intervalCount: variant.attributes.interval_count,
        status: variant.attributes.status,
        sort: variant.attributes.sort,
        // Special handling for enterprise plan
        isCustom: product.attributes.name.toLowerCase().includes('enterprise'),
        featured: product.attributes.name.toLowerCase().includes('enterprise')
      }

      await prisma.plan.upsert({
        where: { variantId: variant.id },
        create: planData,
        update: planData,
      })
    }
  }
}


const lemonSqueezyProducts = {
  "meta": {
    "page": {
      "currentPage": 1,
      "from": 1,
      "lastPage": 1,
      "perPage": 10,
      "to": 3,
      "total": 3
    }
  },
  "jsonapi": {
    "version": "1.0"
  },
  "links": {
    "first": "https://api.lemonsqueezy.com/v1/products?page%5Bnumber%5D=1&page%5Bsize%5D=10&sort=name",
    "last": "https://api.lemonsqueezy.com/v1/products?page%5Bnumber%5D=1&page%5Bsize%5D=10&sort=name"
  },
  "data": [
    {
      "type": "products",
      "id": "375174",
      "attributes": {
        "store_id": 129152,
        "name": "Basic Plan",
        "slug": "basic-plan",
        "description": "<ul><li><p>Ideal for small businesses looking to scale with moderate API needs.</p></li><li><p>Features: </p><p>• 300,000 API calls per month </p><p>• Up to 15 API calls per second </p><p>• 3 API keys • Custom support </p><p>• Access to basic performance analytics</p></li></ul>",
        "status": "published",
        "status_formatted": "Published",
        "thumb_url": null,
        "large_thumb_url": null,
        "price": 25000,
        "price_formatted": "$250.00 - $2,100.00",
        "from_price": 25000,
        "to_price": 210000,
        "pay_what_you_want": false,
        "buy_now_url": "https://walletlabs.lemonsqueezy.com/checkout/buy/644e623a-0b21-4ddd-9fd1-0e735a13154a",
        "from_price_formatted": "$250.00",
        "to_price_formatted": "$2,100.00",
        "created_at": "2024-10-19T10:57:59.000000Z",
        "updated_at": "2024-10-20T00:15:21.000000Z",
        "test_mode": true
      },
      "relationships": {
        "store": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/products/375174/store",
            "self": "https://api.lemonsqueezy.com/v1/products/375174/relationships/store"
          }
        },
        "variants": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/products/375174/variants",
            "self": "https://api.lemonsqueezy.com/v1/products/375174/relationships/variants"
          }
        }
      },
      "links": {
        "self": "https://api.lemonsqueezy.com/v1/products/375174"
      }
    },
    {
      "type": "products",
      "id": "375159",
      "attributes": {
        "store_id": 129152,
        "name": "Free Tier",
        "slug": "free-tier",
        "description": "<p>Suitable for small projects or testing purposes.<br><br>Features: </p>\n\n<p>• 100,000 API calls per month </p>\n\n<p>• Up to 5 API calls per second </p>\n\n<p>• Free API key</p>",
        "status": "published",
        "status_formatted": "Published",
        "thumb_url": null,
        "large_thumb_url": null,
        "price": 0,
        "price_formatted": "$0.00/month",
        "from_price": null,
        "to_price": null,
        "pay_what_you_want": false,
        "buy_now_url": "https://walletlabs.lemonsqueezy.com/checkout/buy/d2fcccda-af60-4723-b54a-1598b89ef06e",
        "from_price_formatted": null,
        "to_price_formatted": null,
        "created_at": "2024-10-19T10:34:26.000000Z",
        "updated_at": "2024-10-19T10:56:23.000000Z",
        "test_mode": true
      },
      "relationships": {
        "store": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/products/375159/store",
            "self": "https://api.lemonsqueezy.com/v1/products/375159/relationships/store"
          }
        },
        "variants": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/products/375159/variants",
            "self": "https://api.lemonsqueezy.com/v1/products/375159/relationships/variants"
          }
        }
      },
      "links": {
        "self": "https://api.lemonsqueezy.com/v1/products/375159"
      }
    },
    {
      "type": "products",
      "id": "375177",
      "attributes": {
        "store_id": 129152,
        "name": "Pro Plan",
        "slug": "pro-plan",
        "description": "<ul><li><p>Designed for growing businesses with higher API demand.</p></li><li><p>Features: </p><p>• 800,000 API calls per month </p><p>• Up to 25 API calls per second </p><p>• 5 API keys • Custom support </p><p>• Priority bug fixes </p><p>• Feature requests</p></li></ul>",
        "status": "published",
        "status_formatted": "Published",
        "thumb_url": null,
        "large_thumb_url": null,
        "price": 50000,
        "price_formatted": "$500.00 - $4,500.00",
        "from_price": 50000,
        "to_price": 450000,
        "pay_what_you_want": false,
        "buy_now_url": "https://walletlabs.lemonsqueezy.com/checkout/buy/d62be5dd-a939-40ad-a8a8-15df805b9752",
        "from_price_formatted": "$500.00",
        "to_price_formatted": "$4,500.00",
        "created_at": "2024-10-19T11:05:09.000000Z",
        "updated_at": "2024-10-19T12:34:38.000000Z",
        "test_mode": true
      },
      "relationships": {
        "store": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/products/375177/store",
            "self": "https://api.lemonsqueezy.com/v1/products/375177/relationships/store"
          }
        },
        "variants": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/products/375177/variants",
            "self": "https://api.lemonsqueezy.com/v1/products/375177/relationships/variants"
          }
        }
      },
      "links": {
        "self": "https://api.lemonsqueezy.com/v1/products/375177"
      }
    },
    {
      "type": "products",
      "id": "375180",
      "attributes": {
        "store_id": 129152,
        "name": "Enterprise Plans",
        "slug": "enterprise-plans",
        "description": "<p>Enterprise-level support with high scalability and tailored services.</p><p>Features: </p><p>• 3+ million API calls per month </p><p>• Up to 50 API calls per second </p><p>• Up to 25 API keys </p><p>• Tailored solutions for large enterprises </p><p>• GCP/S3 Dataset access </p><p>• Enhanced support </p><p>• Negotiable API keys and calls based on need</p>",
        "status": "published",
        "price": null,
        "status_formatted": "Published",
        "thumb_url": null,
        "large_thumb_url": null,
        "pay_what_you_want": false,
        "buy_now_url": null,
        "from_price": null,
        "to_price": null,
        "created_at": "2024-10-19T12:32:32.000000Z",
        "updated_at": "2024-10-19T12:33:15.000000Z",
        "test_mode": true
      },
      "relationships": {
        "store": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/products/375180/store",
            "self": "https://api.lemonsqueezy.com/v1/products/375180/relationships/store"
          }
        },
        "variants": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/products/375180/variants",
            "self": "https://api.lemonsqueezy.com/v1/products/375180/relationships/variants"
          }
        }
      },
      "links": {
        "self": "https://api.lemonsqueezy.com/v1/products/375180"
      }
    }
  ]
}
const lemonSqueezyVariants = {
  "meta": {
    "page": {
      "currentPage": 1,
      "from": 1,
      "lastPage": 1,
      "perPage": 10,
      "to": 9,
      "total": 9
    }
  },
  "jsonapi": {
    "version": "1.0"
  },
  "links": {
    "first": "https://api.lemonsqueezy.com/v1/variants?page%5Bnumber%5D=1&page%5Bsize%5D=10&sort=sort",
    "last": "https://api.lemonsqueezy.com/v1/variants?page%5Bnumber%5D=1&page%5Bsize%5D=10&sort=sort"
  },
  "data": [
    {
      "type": "variants",
      "id": "562610",
      "attributes": {
        "price": 25000,
        "is_subscription": true,
        "interval": "month",
        "interval_count": 1,
        "has_free_trial": false,
        "trial_interval": "day",
        "trial_interval_count": 30,
        "pay_what_you_want": false,
        "min_price": 0,
        "suggested_price": 0,
        "product_id": 375174,
        "name": "Basic Plan - Monthly",
        "slug": "644e623a-0b21-4ddd-9fd1-0e735a13154a",
        "description": "",
        "links": [],
        "has_license_keys": false,
        "license_activation_limit": 5,
        "is_license_limit_unlimited": false,
        "license_length_value": 1,
        "license_length_unit": "years",
        "is_license_length_unlimited": false,
        "sort": 0,
        "status": "published",
        "status_formatted": "Published",
        "created_at": "2024-10-19T11:03:49.000000Z",
        "updated_at": "2024-10-19T11:04:40.000000Z",
        "test_mode": true
      },
      "relationships": {
        "product": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562610/product",
            "self": "https://api.lemonsqueezy.com/v1/variants/562610/relationships/product"
          }
        },
        "files": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562610/files",
            "self": "https://api.lemonsqueezy.com/v1/variants/562610/relationships/files"
          }
        },
        "price-model": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562610/price-model",
            "self": "https://api.lemonsqueezy.com/v1/variants/562610/relationships/price-model"
          }
        }
      },
      "links": {
        "self": "https://api.lemonsqueezy.com/v1/variants/562610"
      }
    },
    {
      "type": "variants",
      "id": "562578",
      "attributes": {
        "price": 0,
        "is_subscription": true,
        "interval": "month",
        "interval_count": 1,
        "has_free_trial": false,
        "trial_interval": "day",
        "trial_interval_count": 30,
        "pay_what_you_want": false,
        "min_price": 0,
        "suggested_price": 0,
        "product_id": 375159,
        "name": "Free Tier",
        "slug": "d2fcccda-af60-4723-b54a-1598b89ef06e",
        "description": "",
        "links": [],
        "has_license_keys": false,
        "license_activation_limit": 5,
        "is_license_limit_unlimited": false,
        "license_length_value": 1,
        "license_length_unit": "years",
        "is_license_length_unlimited": false,
        "sort": 1,
        "status": "published",
        "status_formatted": "Published",
        "created_at": "2024-10-19T10:34:27.000000Z",
        "updated_at": "2024-10-19T10:56:23.000000Z",
        "test_mode": true
      },
      "relationships": {
        "product": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562578/product",
            "self": "https://api.lemonsqueezy.com/v1/variants/562578/relationships/product"
          }
        },
        "files": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562578/files",
            "self": "https://api.lemonsqueezy.com/v1/variants/562578/relationships/files"
          }
        },
        "price-model": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562578/price-model",
            "self": "https://api.lemonsqueezy.com/v1/variants/562578/relationships/price-model"
          }
        }
      },
      "links": {
        "self": "https://api.lemonsqueezy.com/v1/variants/562578"
      }
    },
    {
      "type": "variants",
      "id": "562607",
      "attributes": {
        "price": 120000,
        "is_subscription": true,
        "interval": "month",
        "interval_count": 6,
        "has_free_trial": false,
        "trial_interval": "day",
        "trial_interval_count": 30,
        "pay_what_you_want": false,
        "min_price": 0,
        "suggested_price": 0,
        "product_id": 375174,
        "name": "Basic Plan - Biannual",
        "slug": "04198584-8588-4468-82fc-a6f8006efd72",
        "description": "",
        "links": [],
        "has_license_keys": false,
        "license_activation_limit": 5,
        "is_license_limit_unlimited": false,
        "license_length_value": 1,
        "license_length_unit": "years",
        "is_license_length_unlimited": false,
        "sort": 1,
        "status": "published",
        "status_formatted": "Published",
        "created_at": "2024-10-19T10:57:59.000000Z",
        "updated_at": "2024-10-19T11:04:40.000000Z",
        "test_mode": true
      },
      "relationships": {
        "product": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562607/product",
            "self": "https://api.lemonsqueezy.com/v1/variants/562607/relationships/product"
          }
        },
        "files": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562607/files",
            "self": "https://api.lemonsqueezy.com/v1/variants/562607/relationships/files"
          }
        },
        "price-model": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562607/price-model",
            "self": "https://api.lemonsqueezy.com/v1/variants/562607/relationships/price-model"
          }
        }
      },
      "links": {
        "self": "https://api.lemonsqueezy.com/v1/variants/562607"
      }
    },
    {
      "type": "variants",
      "id": "562611",
      "attributes": {
        "price": 25000,
        "is_subscription": true,
        "interval": "month",
        "interval_count": 1,
        "has_free_trial": false,
        "trial_interval": "day",
        "trial_interval_count": 30,
        "pay_what_you_want": false,
        "min_price": 0,
        "suggested_price": 0,
        "product_id": 375174,
        "name": "Default",
        "slug": "d8f11f14-d965-43ae-b019-87f115cc19a0",
        "description": "",
        "links": [],
        "has_license_keys": false,
        "license_activation_limit": 5,
        "is_license_limit_unlimited": false,
        "license_length_value": 1,
        "license_length_unit": "years",
        "is_license_length_unlimited": false,
        "sort": 1,
        "status": "pending",
        "status_formatted": "Pending",
        "created_at": "2024-10-19T11:04:49.000000Z",
        "updated_at": "2024-10-20T00:15:21.000000Z",
        "test_mode": true
      },
      "relationships": {
        "product": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562611/product",
            "self": "https://api.lemonsqueezy.com/v1/variants/562611/relationships/product"
          }
        },
        "files": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562611/files",
            "self": "https://api.lemonsqueezy.com/v1/variants/562611/relationships/files"
          }
        },
        "price-model": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562611/price-model",
            "self": "https://api.lemonsqueezy.com/v1/variants/562611/relationships/price-model"
          }
        }
      },
      "links": {
        "self": "https://api.lemonsqueezy.com/v1/variants/562611"
      }
    },
    {
      "type": "variants",
      "id": "562809",
      "attributes": {
        "price": 50000,
        "is_subscription": true,
        "interval": "month",
        "interval_count": 1,
        "has_free_trial": false,
        "trial_interval": "day",
        "trial_interval_count": 30,
        "pay_what_you_want": false,
        "min_price": 0,
        "suggested_price": 0,
        "product_id": 375177,
        "name": "Default",
        "slug": "e6a92c25-4832-495c-b38f-f912fd2aa19a",
        "description": "",
        "links": [],
        "has_license_keys": false,
        "license_activation_limit": 5,
        "is_license_limit_unlimited": false,
        "license_length_value": 1,
        "license_length_unit": "years",
        "is_license_length_unlimited": false,
        "sort": 1,
        "status": "pending",
        "status_formatted": "Pending",
        "created_at": "2024-10-19T12:34:31.000000Z",
        "updated_at": "2024-10-19T12:34:38.000000Z",
        "test_mode": true
      },
      "relationships": {
        "product": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562809/product",
            "self": "https://api.lemonsqueezy.com/v1/variants/562809/relationships/product"
          }
        },
        "files": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562809/files",
            "self": "https://api.lemonsqueezy.com/v1/variants/562809/relationships/files"
          }
        },
        "price-model": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562809/price-model",
            "self": "https://api.lemonsqueezy.com/v1/variants/562809/relationships/price-model"
          }
        }
      },
      "links": {
        "self": "https://api.lemonsqueezy.com/v1/variants/562809"
      }
    },
    {
      "type": "variants",
      "id": "562608",
      "attributes": {
        "price": 210000,
        "is_subscription": true,
        "interval": "year",
        "interval_count": 1,
        "has_free_trial": false,
        "trial_interval": "day",
        "trial_interval_count": 30,
        "pay_what_you_want": false,
        "min_price": 0,
        "suggested_price": 0,
        "product_id": 375174,
        "name": "Basic Plan - Annual",
        "slug": "1c5cd8d0-0e6f-489b-8dc1-1f2be07e7495",
        "description": "",
        "links": [],
        "has_license_keys": false,
        "license_activation_limit": 5,
        "is_license_limit_unlimited": false,
        "license_length_value": 1,
        "license_length_unit": "years",
        "is_license_length_unlimited": false,
        "sort": 2,
        "status": "published",
        "status_formatted": "Published",
        "created_at": "2024-10-19T11:02:33.000000Z",
        "updated_at": "2024-10-19T11:04:40.000000Z",
        "test_mode": true
      },
      "relationships": {
        "product": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562608/product",
            "self": "https://api.lemonsqueezy.com/v1/variants/562608/relationships/product"
          }
        },
        "files": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562608/files",
            "self": "https://api.lemonsqueezy.com/v1/variants/562608/relationships/files"
          }
        },
        "price-model": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562608/price-model",
            "self": "https://api.lemonsqueezy.com/v1/variants/562608/relationships/price-model"
          }
        }
      },
      "links": {
        "self": "https://api.lemonsqueezy.com/v1/variants/562608"
      }
    },
    {
      "type": "variants",
      "id": "562613",
      "attributes": {
        "price": 50000,
        "is_subscription": true,
        "interval": "month",
        "interval_count": 1,
        "has_free_trial": false,
        "trial_interval": "day",
        "trial_interval_count": 30,
        "pay_what_you_want": false,
        "min_price": 0,
        "suggested_price": 0,
        "product_id": 375177,
        "name": "Pro Plan - Monthly",
        "slug": "d62be5dd-a939-40ad-a8a8-15df805b9752",
        "description": "",
        "links": [],
        "has_license_keys": false,
        "license_activation_limit": 5,
        "is_license_limit_unlimited": false,
        "license_length_value": 1,
        "license_length_unit": "years",
        "is_license_length_unlimited": false,
        "sort": 2,
        "status": "published",
        "status_formatted": "Published",
        "created_at": "2024-10-19T11:05:10.000000Z",
        "updated_at": "2024-10-19T12:33:29.000000Z",
        "test_mode": true
      },
      "relationships": {
        "product": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562613/product",
            "self": "https://api.lemonsqueezy.com/v1/variants/562613/relationships/product"
          }
        },
        "files": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562613/files",
            "self": "https://api.lemonsqueezy.com/v1/variants/562613/relationships/files"
          }
        },
        "price-model": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562613/price-model",
            "self": "https://api.lemonsqueezy.com/v1/variants/562613/relationships/price-model"
          }
        }
      },
      "links": {
        "self": "https://api.lemonsqueezy.com/v1/variants/562613"
      }
    },
    {
      "type": "variants",
      "id": "562806",
      "attributes": {
        "price": 240000,
        "is_subscription": true,
        "interval": "month",
        "interval_count": 6,
        "has_free_trial": false,
        "trial_interval": "day",
        "trial_interval_count": 30,
        "pay_what_you_want": false,
        "min_price": 0,
        "suggested_price": 0,
        "product_id": 375177,
        "name": "Pro Plan - Biannually",
        "slug": "d35c1961-ce8d-4c67-83bf-bac0da63ab5f",
        "description": "",
        "links": [],
        "has_license_keys": false,
        "license_activation_limit": 5,
        "is_license_limit_unlimited": false,
        "license_length_value": 1,
        "license_length_unit": "years",
        "is_license_length_unlimited": false,
        "sort": 3,
        "status": "published",
        "status_formatted": "Published",
        "created_at": "2024-10-19T12:31:42.000000Z",
        "updated_at": "2024-10-19T12:33:38.000000Z",
        "test_mode": true
      },
      "relationships": {
        "product": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562806/product",
            "self": "https://api.lemonsqueezy.com/v1/variants/562806/relationships/product"
          }
        },
        "files": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562806/files",
            "self": "https://api.lemonsqueezy.com/v1/variants/562806/relationships/files"
          }
        },
        "price-model": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562806/price-model",
            "self": "https://api.lemonsqueezy.com/v1/variants/562806/relationships/price-model"
          }
        }
      },
      "links": {
        "self": "https://api.lemonsqueezy.com/v1/variants/562806"
      }
    },
    {
      "type": "variants",
      "id": "562807",
      "attributes": {
        "price": 450000,
        "is_subscription": true,
        "interval": "year",
        "interval_count": 1,
        "has_free_trial": false,
        "trial_interval": "day",
        "trial_interval_count": 30,
        "pay_what_you_want": false,
        "min_price": 0,
        "suggested_price": 0,
        "product_id": 375177,
        "name": "Pro Plan - Annually",
        "slug": "bc969a0a-af52-41e2-bebd-24cfc41c8667",
        "description": "",
        "links": [],
        "has_license_keys": false,
        "license_activation_limit": 5,
        "is_license_limit_unlimited": false,
        "license_length_value": 1,
        "license_length_unit": "years",
        "is_license_length_unlimited": false,
        "sort": 4,
        "status": "published",
        "status_formatted": "Published",
        "created_at": "2024-10-19T12:32:32.000000Z",
        "updated_at": "2024-10-19T12:33:15.000000Z",
        "test_mode": true
      },
      "relationships": {
        "product": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562807/product",
            "self": "https://api.lemonsqueezy.com/v1/variants/562807/relationships/product"
          }
        },
        "files": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562807/files",
            "self": "https://api.lemonsqueezy.com/v1/variants/562807/relationships/files"
          }
        },
        "price-model": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562807/price-model",
            "self": "https://api.lemonsqueezy.com/v1/variants/562807/relationships/price-model"
          }
        }
      },
      "links": {
        "self": "https://api.lemonsqueezy.com/v1/variants/562807"
      }
    },
    {
      "type": "variants",
      "id": "562820",
      "attributes": {
        "price": null,
        "is_subscription": true,
        "interval": "month",
        "interval_count": 1,
        "product_id": 375180,
        "name": "Enterprise Plan",
        "status": "published",
        "sort": 5
      },
      "relationships": {
        "product": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562820/product",
            "self": "https://api.lemonsqueezy.com/v1/variants/562820/relationships/product"
          }
        },
        "files": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562820/files",
            "self": "https://api.lemonsqueezy.com/v1/variants/562820/relationships/files"
          }
        },
        "price-model": {
          "links": {
            "related": "https://api.lemonsqueezy.com/v1/variants/562820/price-model",
            "self": "https://api.lemonsqueezy.com/v1/variants/562820/relationships/price-model"
          }
        }
      },
      "links": {
        "self": "https://api.lemonsqueezy.com/v1/variants/562820"
      }
    }
  ]
}
// Initialize PrismaClient
const prisma = new PrismaClient()
const products = lemonSqueezyProducts.data
const variants = lemonSqueezyVariants.data

async function main() {
  try {
    await syncPlans(prisma, products, variants)
    console.log('Successfully synced plans')
  } catch (error) {
    console.error('Error syncing plans:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Execute the main function
main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })