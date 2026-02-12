import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
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

  const currentYear = new Date().getFullYear();
  const fromDate = `${currentYear}-01-01T00:00:00Z`;

  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        contributionsCollection(from: "${fromDate}", to: "${new Date().toISOString()}") {
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

    if (!data.data?.user) {
      return NextResponse.json(
        { error: 'GitHub user not found' },
        { status: 404 }
      );
    }

    const calendar = data.data.user.contributionsCollection.contributionCalendar;

    const transformedData = {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks.map((week: { contributionDays: { contributionCount: number; date: string }[] }) => ({
        contributionDays: week.contributionDays.map((day: { contributionCount: number; date: string }) => ({
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