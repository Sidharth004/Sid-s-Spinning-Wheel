import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const GITHUB_API_URL = 'https://api.github.com/graphql';
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_USERNAME = 'Sidharth004';

  if (!GITHUB_TOKEN) {
    console.error('GitHub token not configured');
    return NextResponse.json(
      { error: 'GitHub token not configured' },
      { status: 500 }
    );
  }

  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        contributionsCollection(from: "2025-01-01T00:00:00Z", to: "${new Date().toISOString()}") {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(GITHUB_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('GitHub API request failed');
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('GitHub API errors:', data.errors);
      return NextResponse.json(
        { error: 'GitHub API returned errors' },
        { status: 500 }
      );
    }

    const calendar = data.data.user.contributionsCollection.contributionCalendar;

    const transformedData = {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks.map((week: any) => ({
        contributionDays: week.contributionDays.map((day: any) => ({
          count: day.contributionCount,
          date: day.date,
        })),
      })),
    };

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub contributions' },
      { status: 500 }
    );
  }
}